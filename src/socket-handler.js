import store from './vuex/store'
import {getAccount, getApiTicket, getCharacterName} from './vuex/getters'

const urls = {
  mainInsecure: 'ws://chat.f-list.net:9722',
  main: 'wss://chat.f-list.net:9799',
  testInsecure: 'ws://chat.f-list.net:8722',
  test: 'ws://chat.f-list.net:8799'
}

export default class SocketHandler {
  constructor (urlID) {
    /* eslint no-undef: 0 */
    this.ws = new WebSocket(urls[urlID])

    this.ws.onopen = this.onopen.bind(this)
    this.ws.onclose = this.onclose.bind(this)
    this.ws.onmessage = this.onmessage.bind(this)
    this.ws.onerror = this.onerror.bind(this)
  }

  onopen () {
    store.dispatch('SOCKET_OPENED', this)

    const {state} = store

    const params = {
      method: 'ticket',
      account: getAccount(state),
      ticket: getApiTicket(state),
      character: getCharacterName(state),
      cname: 'fchat-next',
      cversion: '0.1.0'
    }

    this.ws.send(`IDN ${JSON.stringify(params)}`)
    store.dispatch('CHAT_IDENTIFY_REQUEST')
  }

  onclose () {
    store.dispatch('SOCKET_CLOSED')
  }

  onmessage ({ data }) {
    const command = data.substring(0, 3)
    const params = data.length > 3 ? data.substring(4) : {}
    this.handleChatCommand(command, params)
  }

  onerror () {
    store.dispatch('SOCKET_ERROR', err)
  }

  handleChatCommand (command, params) {
    switch (command) {
      // identify with server
      case 'IDN':
        store.dispatch('CHAT_IDENTIFY_SUCCESS')
        break

      /* ping~! */
      case 'PIN':
        /* pong~! */
        this.ws.send('PIN')
        break

      default:
        console.warn(`Unknown command ${command} with params:`, params)
    }
  }
}
