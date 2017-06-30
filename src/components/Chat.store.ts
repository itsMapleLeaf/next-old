import { observable, action } from 'mobx'
import meta from '../../package.json'

const serverURL = 'wss://chat.f-list.net:9799'

export class ChannelInfo {
  constructor(
    public id: string,
    public title: string,
    public userCount: number,
    public mode: 'ads' | 'chat' | 'both',
    public type: ChannelType
  ) {}
}

export enum ChannelType {
  public,
  private,
}

export default class ChatStore {
  socket = new WebSocket(serverURL)

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

  init(account: string, ticket: string, identity: string) {
    this.setIdentity(identity)

    this.socket.onopen = () => {
      this.sendCommand('IDN', {
        account,
        ticket,
        character: identity,
        cname: meta.name,
        cversion: meta.version,
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
    this.socket.close()
  }

  sendCommand(cmd: string, params?: object) {
    if (params) {
      this.socket.send(cmd + ' ' + JSON.stringify(params))
    } else {
      this.socket.send(cmd)
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
        for (const { name, mode, characters } of params.channels) {
          channels.push(new ChannelInfo(name, name, characters, mode, ChannelType.public))
        }
        this.updateChannelList(channels)
      },

      ORS() {
        const channels = []
        for (const { name, title, mode, characters } of params.channels) {
          channels.push(new ChannelInfo(name, title, characters, mode, ChannelType.private))
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
