import * as forage from 'localforage'
import { action, computed, observable } from 'mobx'
import { fetchCharacters, fetchTicket } from '../lib/f-list'
import ChatState from './chat-state'

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

      if (cmd === 'PIN') {
        this.sendCommand('PIN')
      }

      if (cmd === 'IDN') {
        this.joinChannel('Frontpage')
        this.joinChannel('Story Driven LFRP')
        this.joinChannel('Development')
        this.joinChannel('Fantasy')
        this.joinChannel('Love and Affection')
      }

      this.chat.handleSocketCommand(cmd, params)
    }

    this.socket.onclose = this.socket.onerror = () => {
      this.socket = undefined
    }
  }

  @action
  disconnect() {
    if (this.socket) this.socket.close()
  }

  @computed
  get isConnected() {
    return this.socket != null
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

  @action
  joinChannel(id: string) {
    this.chat.addChannel(id)
    this.sendCommand('JCH', { channel: id })
  }
}
