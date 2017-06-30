import { action, observable } from 'mobx'

const serverURL = 'wss://chat.f-list.net:9799'
const clientName = 'next'
const clientVersion = '0.12.0'

export class ChannelInfo {
  constructor(
    public id: string,
    public title: string,
    public userCount: number,
    public type: ChannelType
  ) {}
}

export enum ChannelType {
  public,
  private,
}

export default class ChatStore {
  socket: WebSocket | void

  @observable identity = ''
  @observable channelList = [] as ChannelInfo[]

  onDisconnect = () => {}

  @action
  setIdentity(identity: string) {
    this.identity = identity
  }

  @action
  clearChannelList() {
    this.channelList.splice(0)
  }

  @action
  updateChannelList(channels: ChannelInfo[]) {
    this.channelList.push(...channels)
  }

  connect(account: string, ticket: string, identity: string) {
    this.setIdentity(identity)

    this.socket = new WebSocket(serverURL)

    this.socket.onopen = () => {
      this.sendCommand('IDN', {
        account,
        ticket,
        character: identity,
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

    this.socket.onclose = this.socket.onerror = () => this.onDisconnect()
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
        this.sendCommand('PIN')
      },

      IDN() {},
      HLO() {},
      CON() {},
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
    }

    if (handlers[cmd]) {
      handlers[cmd].call(this)
    } else {
      console.log(cmd, params)
    }
  }

  requestChannelList() {
    this.clearChannelList()
    this.sendCommand('CHA')
    this.sendCommand('ORS')
  }
}
