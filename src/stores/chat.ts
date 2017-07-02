import * as forage from 'localforage'
import { observable } from 'mobx'

const serverURL = 'wss://chat.f-list.net:9799'
const clientName = 'next'
const clientVersion = '0.12.0'

export enum ChannelType {
  public,
  private,
}

export class ChannelInfo {
  constructor(
    public id: string,
    public title: string,
    public userCount: number,
    public type: ChannelType
  ) {}
}

export class Channel {
  @observable title = this.id
  constructor(public id: string) {}
}

export class ChatStore {
  socket: WebSocket | void
  @observable identity = ''
  @observable channelList = [] as ChannelInfo[]
  @observable channels = new Map<string, Channel>()

  onDisconnect = () => {}

  setIdentity(identity: string) {
    this.identity = identity
  }

  connect(account: string, ticket: string) {
    this.socket = new WebSocket(serverURL)

    this.socket.onopen = () => {
      this.sendCommand('IDN', {
        account,
        ticket,
        character: this.identity,
        cname: clientName,
        cversion: clientVersion,
        method: 'ticket',
      })
    }

    this.socket.onmessage = msg => {
      const data = msg.data as string
      const cmd = data.slice(0, 3)
      const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}
      this.handleSocketCommand(cmd, params)
    }

    this.socket.onclose = this.socket.onerror = () => {
      this.onDisconnect()
      this.socket = undefined
    }
  }

  disconnect() {
    if (this.socket) this.socket.close()
  }

  sendCommand(cmd: string, params?: object) {
    if (this.socket) {
      if (params) {
        this.socket.send(cmd + ' ' + JSON.stringify(params))
      } else {
        this.socket.send(cmd)
      }
    }
  }

  handleSocketCommand(cmd: string, params: any) {
    const handlers: { [cmd: string]: (this: ChatStore) => any } = {
      PIN() {
        console.log('ping')
        this.sendCommand('PIN')
      },

      IDN() {
        console.info('Successfully connected to server.')
        this.restoreChannels()
      },

      HLO() {
        console.info(params.message)
      },

      CON() {
        console.info(`There are ${params.count} characters online.`)
      },

      VAR() {},
      LIS() {},
      NLN() {},
      FLN() {},
      STA() {},

      CHA() {
        const channels = []
        for (const { name, characters } of params.channels) {
          channels.push(new ChannelInfo(name, name, characters, ChannelType.public))
        }
        this.updateChannelList(channels)
      },

      ORS() {
        const channels = []
        for (const { name, title, characters } of params.channels) {
          channels.push(new ChannelInfo(name, title, characters, ChannelType.private))
        }
        this.updateChannelList(channels)
      },

      JCH() {
        const character = params.character.identity as string
        if (character === this.identity) {
          this.createChannel(params.channel)
        }
      },

      LCH() {
        const { character, channel } = params
        if (character === this.identity) {
          this.removeChannel(channel)
        }
      },
    }

    if (handlers[cmd]) {
      handlers[cmd].call(this)
    } else {
      console.log(cmd, params)
    }
  }

  clearChannelList() {
    this.channelList.splice(0)
  }

  updateChannelList(channels: ChannelInfo[]) {
    this.channelList.push(...channels)
  }

  createChannel(id: string) {
    if (!this.channels.has(id)) {
      this.channels.set(id, new Channel(id))
      this.saveChannels()
    }
  }

  removeChannel(id: string) {
    if (this.channels.has(id)) {
      this.channels.delete(id)
      this.saveChannels()
    }
  }

  saveChannels() {
    forage.setItem('joinedChannels:' + this.identity, Object.keys(this.channels))
  }

  async restoreChannels() {
    const channels = (await forage.getItem('joinedChannels:' + this.identity)) as string[] | null
    for (const id of channels || []) {
      this.joinChannel(id)
    }
  }

  requestChannelList() {
    this.clearChannelList()
    this.sendCommand('CHA')
    this.sendCommand('ORS')
  }

  joinChannel(id: string) {
    this.createChannel(id)
    this.sendCommand('JCH', { channel: id })
  }

  leaveChannel(id: string) {
    this.removeChannel(id)
    this.sendCommand('LCH', { channel: id })
  }

  isChannelJoined(id: string) {
    return this.channels.has(id)
  }
}
