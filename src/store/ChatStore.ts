import Vue from 'vue'
import * as forage from 'localforage'
import fromPairs from 'lodash/fromPairs'
import { ChannelListStore } from './ChannelListStore'
import { ChannelStore } from './ChannelStore'
import { Character, PrivateChat, Message } from './models'

export class ChatStore {
  identity = ''
  friends = {} as Dictionary<boolean>
  ignored = {} as Dictionary<boolean>
  admins = {} as Dictionary<boolean>
  characters = {} as Dictionary<Character>
  privateChats = {} as Dictionary<PrivateChat>

  channels = new ChannelStore()
  channelList = new ChannelListStore()

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

      this.handleSocketCommand(cmd, params)
      this.channelList.handleSocketCommand(cmd, params)
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
      PIN() {
        // dispatch('sendSocketCommand', { cmd: 'PIN' })
        this.sendSocketCommand('PIN')
      },

      IDN() {
        console.info('Successfully connected to server')
        this.restoreJoinedChannels()
        this.restorePrivateChats()
      },

      VAR() {},

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

      LIS() {
        type CharacterBatch = Array<[string, string, string, string]>
        const batch = params.characters as CharacterBatch
        const map = {} as Dictionary<Character>
        for (const [name, gender, status, statusMessage] of batch) {
          map[name] = new Character(name, gender, status, statusMessage)
        }
        this.characters = Object.assign(this.characters, map)
      },

      NLN() {
        Vue.set(
          this.characters,
          params.identity,
          new Character(params.identity, params.gender, 'online'),
        )
      },

      FLN() {
        Vue.delete(this.characters, params.character)
      },

      STA() {
        const char = this.characters[params.character]
        if (char) {
          char.status = params.status
          char.statusMessage = params.statusmsg
        }
      },

      JCH() {
        const channel = this.channels.getChannel(params.channel)
        const name = params.character.identity
        channel.title = params.title
        channel.users.push(this.characters[name])

        if (name === this.identity) {
          this.channels.addJoinedChannel(params.channel)
        }
      },

      LCH() {
        const channel = this.channels.getChannel(params.channel)
        channel.users = channel.users.filter(
          user => user.name !== params.character,
        )

        if (params.character === this.identity) {
          this.channels.removeJoinedChannel(params.channel)
        }
      },

      ICH() {
        const channel = this.channels.getChannel(params.channel)
        channel.mode = params.mode
        channel.users = params.users.map((user: { identity: string }) => {
          return this.characters[user.identity]
        })
      },

      CDS() {
        const channel = this.channels.getChannel(params.channel)
        channel.description = params.description
      },

      COL() {
        const channel = this.channels.getChannel(params.channel)
        channel.description = params.oplist
      },

      MSG() {
        const channel = this.channels.getChannel(params.channel)
        channel.messages.push(
          new Message(
            this.characters[params.character],
            params.message,
            'normal',
          ),
        )
      },

      LRP() {
        const channel = this.channels.getChannel(params.channel)
        channel.messages.push(
          new Message(
            this.characters[params.character],
            params.message,
            'lfrp',
          ),
        )
      },

      PRI() {
        this.openPrivateChat(params.character)

        this.privateChats[params.character].messages.push(
          new Message(
            this.characters[params.character],
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
    this.saveJoinedChannels()
  }

  leaveChannel(id: string) {
    this.sendSocketCommand('LCH', { channel: id })
    this.saveJoinedChannels()
  }

  sendChannelMessage(id: string, message: string) {
    this.sendSocketCommand('MSG', { channel: id, message })

    const channel = this.channels.getChannel(id)
    if (channel) {
      channel.messages.push(
        new Message(this.characters[this.identity], message, 'normal'),
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
        new PrivateChat(this.characters[partner]),
      )
    }
  }

  removePrivateChat(partner: string) {
    Vue.delete(this.privateChats, partner)
  }

  sendPrivateMessage(recipient: string, message: string) {
    this.sendSocketCommand('PRI', { recipient, message })
    this.privateChats[recipient].messages.push(
      new Message(this.characters[this.identity], message, 'normal'),
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
        new PrivateChat(this.characters[partner]),
      )
    })
  }
}
