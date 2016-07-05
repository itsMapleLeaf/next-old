import EventEmitter from 'events'
import {inspect} from 'util'
import {dispatch} from 'modules/store'

const {WebSocket} = window

class Socket {
  ws: WebSocket | null
  bus: EventEmitter

  constructor () {
    // use an event bus to handle WS commands for some convenience,
    // like using .once() and such
    this.bus = new EventEmitter()
    this.ws = null
  }

  connect (address) {
    this.ws = new WebSocket(address)

    this.ws.onopen = () => this.bus.emit('open')
    this.ws.onclose = () => this.bus.emit('close')
    this.ws.onmessage = msg => this.bus.emit('message', msg)
    this.ws.onerror = err => this.bus.emit('error', err)

    this.bus.on('message', msg => {
      const {type, params} = this.parseServerCommand(msg.data)
      this.handleServerCommand(type, params)
    })

    this.bus.once('open', () => dispatch('SocketConnectionSuccess'))
    this.bus.once('error', err => dispatch('SocketError', err))
  }

  identify (account, ticket, character) {
    const params = {
      account, ticket, character,
      method: 'ticket',
      cname: 'fchat-next',
      cversion: '0.3.1'
    }

    this.send('IDN', params)
  }

  parseServerCommand (command) {
    const type = command.substring(0, 3)
    const params = command.length > 3 ? JSON.parse(command.substring(4)) : {}
    return {type, params}
  }

  send (command: string, params?: Object) {
    const message = params ? `${command} ${JSON.stringify(params)}` : command
    this.ws.send(message)
    console.log('Sent socket message:', message)
  }

  handleServerCommand (type, params) {
    switch (type) {
      case 'IDN':
        dispatch('SocketIdentifySuccess')
        break

      case 'PIN':
        this.send('PIN')
        break

      default:
        console.log(`Unknown socket message "${type}"\n${inspect(params)}`)
    }
  }
}

export const servers = {
  mainInsecure: 'ws://chat.f-list.net:9722',
  main: 'wss://chat.f-list.net:9799',
  testInsecure: 'ws://chat.f-list.net:8722',
  test: 'ws://chat.f-list.net:8799'
}

export const socket = new Socket()
