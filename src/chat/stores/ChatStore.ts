import { fromPairs } from 'lodash'
import { action, computed, observable } from 'mobx'
import { ChannelBrowserStore } from 'src/channel-browser/stores/ChannelBrowserStore'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import { ConsoleStore } from 'src/console/stores/ConsoleStore'
import { Message } from 'src/message/models/Message'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'

interface CommandHandler {
  handleSocketCommand(cmd: string, params: any): void
}

export class ChatStore {
  @observable identity = ''
  @observable friends = observable.map<true>()
  @observable admins = observable.map<true>()
  ignored = observable.map<true>()

  private socket: WebSocket | void

  private commandHandlers: CommandHandler[] = [
    this,
    this.channels,
    this.privateChats,
    this.characters,
    this.channelList,
  ]

  constructor(
    private channels: ChannelStore,
    private privateChats: PrivateChatStore,
    private characters: CharacterStore,
    private channelList: ChannelBrowserStore,
    private console: ConsoleStore,
  ) {}

  @action
  connectToServer(
    account: string,
    ticket: string,
    character: string,
    connectedCallback: () => void,
    closedCallback: () => void,
  ) {
    this.disconnectFromServer()

    this.identity = character

    this.socket = new WebSocket('wss://chat.f-list.net:9799')

    const handleOpen = () => {
      const params = {
        account,
        ticket,
        character,
        cname: APP_NAME,
        cversion: APP_VERSION,
        method: 'ticket',
      }
      this.sendSocketCommand('IDN', params)
    }

    const handleMessage = (msg: MessageEvent) => {
      const data = msg.data
      const cmd = data.slice(0, 3)
      const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}

      if (cmd === 'IDN') {
        connectedCallback()
      }

      this.commandHandlers.forEach(handler => {
        handler.handleSocketCommand(cmd, params)
      })
    }

    const handleClose = () => {
      this.disconnectFromServer()
      closedCallback()
    }

    this.socket.addEventListener('open', handleOpen)
    this.socket.addEventListener('message', handleMessage)
    this.socket.addEventListener('close', handleClose)
    this.socket.addEventListener('error', handleClose)
  }

  @action
  disconnectFromServer() {
    if (this.socket) this.socket.close()
    this.socket = undefined
  }

  sendSocketCommand(cmd: string, params?: object) {
    if (this.socket) {
      if (params) {
        this.socket.send(cmd + ' ' + JSON.stringify(params))
      } else {
        this.socket.send(cmd)
      }
    }
  }

  @action
  handleSocketCommand(cmd: string, params: any) {
    const handlers: { [command: string]: (this: ChatStore) => void } = {
      PIN() {
        // dispatch('sendSocketCommand', { cmd: 'PIN' })
        this.sendSocketCommand('PIN')
      },

      IDN() {
        this.restoreJoinedChannels().catch(console.error)
        this.restorePrivateChats().catch(console.error)
      },

      HLO() {
        this.console.addMessage(params.message)
      },

      CON() {
        this.console.addMessage(`There are ${params.count} characters in chat.`)
      },

      FRL() {
        const characters = params.characters as string[]
        this.friends.merge(fromPairs(characters.map(name => [name, true])))
      },

      IGN() {
        const { action } = params
        if (action === 'init') {
          const characters = params.characters as string[]
          this.ignored.merge(fromPairs(characters.map<[string, true]>(name => [name, true])))
        } else if (action === 'add') {
          this.ignored.set(params.character, true)
        } else if (action === 'delete') {
          this.ignored.delete(params.character)
        }
      },

      ADL() {
        const characters = params.ops as string[]
        this.admins.merge(fromPairs(characters.map(name => [name, true])))
      },

      JCH() {
        if (params.character.identity === this.identity) {
          this.channels.addJoinedChannel(params.channel)
          this.saveJoinedChannels().catch(console.error)
        }
      },

      LCH() {
        if (params.character === this.identity) {
          this.channels.removeJoinedChannel(params.channel)
          this.saveJoinedChannels().catch(console.error)
        }
      },

      RTB() {
        // TODO
        // Friend Request: {type: 'friendadd', name: '...'}
        // Friend Request accepted: {type: 'trackrem(?)', name: '...'}
        // bookmark added
        // if (params.type === 'trackadd') commit('ADD_FRIEND', params.name)
        // bookmark removed
        // if (params.type === 'trackrem') commit('REMOVE_FRIEND', params.name)
      },
    }

    if (handlers[cmd]) {
      handlers[cmd].call(this)
    }
    // console.log(cmd, params)
  }

  fetchChannelList() {
    this.sendSocketCommand('CHA')
    this.sendSocketCommand('ORS')
  }

  joinChannel(id: string) {
    this.sendSocketCommand('JCH', { channel: id })
  }

  leaveChannel(id: string) {
    this.sendSocketCommand('LCH', { channel: id })
  }

  @action
  sendChannelMessage(id: string, message: string) {
    this.sendSocketCommand('MSG', { channel: id, message })

    const channel = this.channels.getChannel(id)
    if (channel) {
      channel.messages.push(new Message(this.identity, message, 'normal'))
    }
  }

  async saveJoinedChannels() {
    await this.channels.saveJoinedChannels(this.identity)
  }

  async restoreJoinedChannels() {
    const channels = await this.channels.restoreJoinedChannels(this.identity)
    channels.forEach(id => {
      this.joinChannel(id)
    })
  }

  @action
  openPrivateChat(partner: string) {
    this.privateChats.openPrivateChat(partner)
    this.savePrivateChats().catch(console.error)
  }

  @action
  removePrivateChat(partner: string) {
    this.privateChats.closePrivateChat(partner)
    this.savePrivateChats().catch(console.error)
  }

  @action
  sendPrivateMessage(recipient: string, message: string) {
    this.sendSocketCommand('PRI', { recipient, message })

    const privateChat = this.privateChats.getPrivateChat(recipient)
    privateChat.messages.push(new Message(this.identity, message, 'normal'))
  }

  async savePrivateChats() {
    await this.privateChats.savePrivateChats(this.identity)
  }

  async restorePrivateChats() {
    const partners = await this.privateChats.restorePrivateChats(this.identity)
    partners.forEach(this.openPrivateChat.bind(this))
  }

  updateStatus(status: string, statusmsg: string) {
    this.sendSocketCommand('STA', { status, statusmsg })
  }

  ignore(name: string) {
    this.sendSocketCommand('IGN', { action: 'add', character: name })
  }

  unignore(name: string) {
    this.sendSocketCommand('IGN', { action: 'delete', character: name })
  }

  isIgnored(name: string) {
    return this.ignored.has(name)
  }

  @computed
  get identityCharacter() {
    return this.characters.getCharacter(this.identity)
  }
}
