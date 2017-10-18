import Vue from 'vue'
import * as forage from 'localforage'
import fromPairs = require('lodash/fromPairs')

import {
  Character,
  Channel,
  ChannelInfo,
  PrivateChat,
  Message,
} from '@/store.new/models'

export class ChatStore {
  socket: WebSocket | void

  identity = ''
  friends = {} as Dictionary<boolean>
  ignored = {} as Dictionary<boolean>
  admins = {} as Dictionary<boolean>
  joinedChannels = {} as Dictionary<boolean>
  characters = {} as Dictionary<Character>
  channelList = [] as ChannelInfo[]
  channels = {} as Dictionary<Channel>
  privateChats = {} as Dictionary<PrivateChat>

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

      CHA() {
        const channels = params.channels.map(
          (ch: { name: string; characters: number }) => {
            return new ChannelInfo('public', ch.name, ch.name, ch.characters)
          },
        )
        this.channelList.push(...channels)
      },

      ORS() {
        const channels = params.channels.map(
          (ch: { name: string; title: string; characters: number }) => {
            return new ChannelInfo('private', ch.name, ch.title, ch.characters)
          },
        )
        this.channelList.push(...channels)
      },

      JCH() {
        const name = params.character.identity
        const channel = this.channels[params.channel]
        if (name === this.identity) {
          Vue.set(this.joinedChannels, params.channel, true)
          channel.title = params.title
        }
        channel.users.push(this.characters[name])
      },

      LCH() {
        if (params.character === this.identity) {
          Vue.delete(this.joinedChannels, params.channel)
        }
        const channel = this.channels[params.channel]
        channel.users = channel.users.filter(
          user => user.name !== params.character,
        )
      },

      ICH() {
        const channel = this.channels[params.channel]
        channel.mode = params.mode
        channel.users = params.users.map((user: { identity: string }) => {
          return this.characters[user.identity]
        })
      },

      CDS() {
        const channel = this.channels[params.channel]
        channel.description = params.description
      },

      COL() {
        const channel = this.channels[params.channel]
        channel.description = params.oplist
      },

      MSG() {
        const channel = this.channels[params.channel]
        channel.messages.push(
          new Message(
            this.characters[params.character],
            params.message,
            'normal',
          ),
        )
      },

      LRP() {
        const channel = this.channels[params.channel]
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
    this.channelList = []
    this.sendSocketCommand('CHA')
    this.sendSocketCommand('ORS')
  }

  joinChannel(id: string) {
    if (!this.channels[id]) {
      Vue.set(this.channels, id, new Channel(id))
    }
    this.joinedChannels[id] = true

    this.sendSocketCommand('JCH', { channel: id })
    this.saveJoinedChannels()
  }

  leaveChannel(id: string) {
    Vue.delete(this.channels, id)
    this.sendSocketCommand('LCH', { channel: id })
    this.saveJoinedChannels()
  }

  sendChannelMessage(id: string, message: string) {
    this.sendSocketCommand('MSG', { channel: id, message })

    const channel = this.channels[id]
    if (channel) {
      channel.messages.push(
        new Message(this.characters[this.identity], message, 'normal'),
      )
    }
  }

  async saveJoinedChannels() {
    const channels = Object.keys(this.joinedChannels)
    await forage.setItem('joinedChannels:' + this.identity, channels)
  }

  async restoreJoinedChannels() {
    const channels = await forage.getItem<string[]>(
      'joinedChannels:' + this.identity,
    )
    for (const id of channels || []) {
      this.joinChannel(id)
    }
  }

  openPrivateChat(partner: string) {
    if (!this.privateChats[partner]) {
      this.privateChats[partner] = new PrivateChat(this.characters[partner])
    }
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
      this.privateChats[partner] = new PrivateChat(this.characters[partner])
    })
  }
}
