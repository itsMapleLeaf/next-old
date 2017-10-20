import fromPairs from 'lodash/fromPairs'
import * as forage from 'localforage'
import Vue from 'vue'
import { ChannelListStore } from './ChannelListStore'
import { ChannelStore } from './ChannelStore'
import { CharacterStore } from './CharacterStore'
import { PrivateChat, Message } from './models'

export class ChatStore {
  identity = ''
  friends = {} as Dictionary<boolean>
  ignored = {} as Dictionary<boolean>
  admins = {} as Dictionary<boolean>
  privateChats = {} as Dictionary<PrivateChat>

  channels = new ChannelStore()
  channelList = new ChannelListStore()
  characters = new CharacterStore()

  private socket: WebSocket | void

  connectToServer(account: string, ticket: string, character: string) {
    this.identity = character

    this.socket = new WebSocket('wss://chat.f-list.net:9799')

    this.socket.onopen = () => {
      const params = {
        account,
        ticket,
        character,
        cname: process.env.APP_NAME,
        cversion: process.env.APP_VERSION,
        method: 'ticket',
      }
      this.sendSocketCommand('IDN', params)
    }

    this.socket.onmessage = msg => {
      const data = msg.data
      const cmd = data.slice(0, 3)
      const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}

      this.channelList.handleSocketCommand(cmd, params)
      this.characters.handleSocketCommand(cmd, params)
      this.channels.handleSocketCommand(cmd, params, this.characters)
      this.handleSocketCommand(cmd, params)
    }

    this.socket.onclose = this.socket.onerror = () => {
      this.disconnectFromServer()
    }
  }

  disconnectFromServer() {
    if (this.socket) this.socket.close()
    this.socket = undefined
  }

  sendSocketCommand(cmd: string, params?: object) {
    if (this.socket) {
      if (params == null) {
        this.socket.send(cmd)
      } else {
        this.socket.send(cmd + ' ' + JSON.stringify(params))
      }
    }
  }

  handleSocketCommand(cmd: string, params: any) {
    const handlers: { [command: string]: (this: ChatStore) => void } = {
      VAR() {},
      LIS() {},
      NLN() {},
      STA() {},
      FLN() {},
      ICH() {},
      CDS() {},
      COL() {},
      MSG() {},
      LRP() {},

      PIN() {
        // dispatch('sendSocketCommand', { cmd: 'PIN' })
        this.sendSocketCommand('PIN')
      },

      IDN() {
        console.info('Successfully connected to server')
        this.restoreJoinedChannels()
        this.restorePrivateChats()
      },

      HLO() {
        console.info(params.message)
      },

      CON() {
        console.info(`There are ${params.count} characters in chat`)
      },

      FRL() {
        const characters = params.characters as string[]
        this.friends = fromPairs(characters.map(name => [name, true]))
      },

      IGN() {
        const characters = params.characters as string[]
        if (params.action === 'init') {
          this.ignored = fromPairs(characters.map(name => [name, true]))
        }
      },

      ADL() {
        const characters = params.ops as string[]
        this.admins = fromPairs(characters.map(name => [name, true]))
      },

      JCH() {
        if (params.character.identity === this.identity) {
          this.channels.addJoinedChannel(params.channel)
        }
      },

      LCH() {
        if (params.character === this.identity) {
          this.channels.removeJoinedChannel(params.channel)
        }
      },

      PRI() {
        this.openPrivateChat(params.character)

        this.privateChats[params.character].messages.push(
          new Message(
            this.characters.getCharacter(params.character),
            params.message,
            'normal',
          ),
        )

        this.savePrivateChats()
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
    } else {
      console.log(cmd, params)
    }
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

  sendChannelMessage(id: string, message: string) {
    this.sendSocketCommand('MSG', { channel: id, message })

    const channel = this.channels.getChannel(id)
    if (channel) {
      channel.messages.push(
        new Message(
          this.characters.getCharacter(this.identity),
          message,
          'normal',
        ),
      )
    }
  }

  async saveJoinedChannels() {
    await this.channels.saveJoinedChannels()
  }

  async restoreJoinedChannels() {
    const channels = await this.channels.restoreJoinedChannels()
    channels.forEach(id => {
      this.joinChannel(id)
    })
  }

  openPrivateChat(partner: string) {
    if (!this.privateChats[partner]) {
      Vue.set(
        this.privateChats,
        partner,
        new PrivateChat(this.characters.getCharacter(partner)),
      )
    }
  }

  removePrivateChat(partner: string) {
    Vue.delete(this.privateChats, partner)
  }

  sendPrivateMessage(recipient: string, message: string) {
    this.sendSocketCommand('PRI', { recipient, message })
    this.privateChats[recipient].messages.push(
      new Message(
        this.characters.getCharacter(this.identity),
        message,
        'normal',
      ),
    )
  }

  async savePrivateChats() {
    await forage.setItem(
      'privateChats:' + this.identity,
      Object.keys(this.privateChats),
    )
  }

  async restorePrivateChats() {
    const partners =
      (await forage.getItem<string[]>('privateChats:' + this.identity)) || []

    partners.forEach(partner => {
      Vue.set(
        this.privateChats,
        partner,
        new PrivateChat(this.characters.getCharacter(partner)),
      )
    })
  }
}
