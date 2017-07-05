import * as forage from 'localforage'
import { action, observable } from 'mobx'
import { ChatState } from './chat-state'
import { fetchCharacters, fetchTicket } from './lib/f-list'

const serverURL = 'wss://chat.f-list.net:9799'
const clientName = 'next'
const clientVersion = '0.12.0'

export default class Store {
  account = ''
  ticket = ''
  @observable userCharacters = [] as string[]
  @observable identity = ''
  chat = new ChatState()
  socket: WebSocket | void

  @action
  async loadUserData() {
    this.account = (await forage.getItem<string>('account')) || ''
    this.ticket = (await forage.getItem<string>('ticket')) || ''
  }

  @action
  async saveUserData() {
    await forage.setItem('account', this.account)
    await forage.setItem('ticket', this.ticket)
  }

  @action
  async login(account: string, password: string) {
    this.ticket = await fetchTicket(account, password)
    this.account = account
  }

  @action
  async fetchUserCharacters() {
    this.userCharacters = await fetchCharacters(this.account, this.ticket)
  }

  @action
  setIdentity(identity: string) {
    this.identity = identity
  }

  @action
  connect() {
    this.socket = new WebSocket(serverURL)

    this.socket.onopen = () => {
      this.sendCommand('IDN', {
        account: this.account,
        ticket: this.ticket,
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
      this.chat.handleSocketCommand(cmd, params)
      if (cmd === 'PIN') this.sendCommand('PIN')
    }

    this.socket.onclose = this.socket.onerror = () => {
      this.socket = undefined
    }
  }

  @action
  disconnect() {
    if (this.socket) this.socket.close()
  }

  @action
  sendCommand(cmd: string, params?: object) {
    if (this.socket) {
      if (params) {
        this.socket.send(cmd + ' ' + JSON.stringify(params))
      } else {
        this.socket.send(cmd)
      }
    }
  }
}
