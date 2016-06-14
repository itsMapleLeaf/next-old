import store from './vuex/store'
import {getAccount, getApiTicket, getCharacterName} from './vuex/getters'
import {inspect} from 'util'

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
    const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}
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

      // receiving server variables
      case 'VAR':
        store.dispatch('SET_SERVER_VARIABLE', params.variable, params.value)
        break

      // hello :)
      case 'HLO':
        console.info(params.message)
        break

      // receive # of characters online
      case 'CON':
        console.info(`There are ${params.count} characters online.`)
        break

      // receiving list of friends
      // we can ignore this, since we already got that from the login data
      case 'FRL': break

      // receiving ignore list action
      case 'IGN':
        switch (params.action) {
          case 'init':
            store.dispatch('SET_IGNORE_LIST', params.characters)
            break

          default:
            console.warn(`Unknown ignore list action ${params.action}`)
        }
        break

      // receiving list of admins
      case 'ADL':
        store.dispatch('SET_ADMIN_LIST', params.ops)
        break

      // receiving all characters online
      // comes in multiple batches
      case 'LIS':
        const charlist = params.characters.map(info => {
          const [name, gender, status, statusMessage] = info
          return { name, gender, status, statusMessage }
        })

        store.dispatch('APPEND_CHARACTERS', charlist)
        break

      default:
        console.warn(`Unknown command ${command} with params:\n`, inspect(params, { depth: null }))
    }
  }
}
