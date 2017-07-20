import * as forage from 'localforage'
import * as api from './api'

const serverURL = 'wss://chat.f-list.net:9799'

class UserStore {
  account = ''
  ticket = ''
  characters = [] as string[]

  async authenticate(account: string, password: string) {
    this.account = account
    this.ticket = await api.fetchTicket(account, password)
  }

  async fetchCharacterList() {
    this.characters = await api.fetchCharacterList(this.account, this.ticket)
  }

  async restoreAuthData() {
    this.account = (await forage.getItem<string>('account')) || ''
    this.ticket = (await forage.getItem<string>('ticket')) || ''
  }

  async saveAuthData() {
    await forage.setItem('account', this.account)
    await forage.setItem('ticket', this.ticket)
  }
}

class ChatStore {
  socket: WebSocket | void
  identity = ''
  joinedChannels = {}

  connect(
    account: string,
    ticket: string,
    character: string,
    onClose: () => any,
  ) {
    this.identity = character

    const socket = (this.socket = new WebSocket(serverURL))

    socket.onopen = () => {
      this.sendCommand('IDN', {
        account,
        ticket,
        character,
        cname: 'next',
        cversion: '0.1.0',
        method: 'ticket',
      })
    }

    socket.onclose = socket.onerror = onClose

    socket.onmessage = msg => {
      const data = msg.data as string
      const cmd = data.slice(0, 3)
      const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}
      this.handleSocketCommand(cmd, params)
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
    switch (cmd) {
      case 'IDN':
        console.info('Successfully connected to server.')
        break

      case 'CON':
        console.info(`There are currently ${params.count} users in chat.`)
        break

      case 'VAR':
        break

      case 'PIN':
        this.sendCommand('PIN')
        break

      default:
        console.log(cmd, params)
    }
  }
}

export default class Store {
  user = new UserStore()
  chat = new ChatStore()
}
