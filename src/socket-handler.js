import store from './vuex/store'
import {inspect} from 'util'

const urls = {
  mainInsecure: 'ws://chat.f-list.net:9722',
  main: 'wss://chat.f-list.net:9799',
  testInsecure: 'ws://chat.f-list.net:8722',
  test: 'ws://chat.f-list.net:8799'
}

export default class SocketHandler {
  connect (urlID, ...identInfo) {
    return new Promise((resolve, reject) => {
      /* eslint no-undef: 0 */
      this.ws = new WebSocket(urls[urlID])

      this.ws.onopen = () => {
        this.sendIdentifyRequest(...identInfo)
      }

      this.ws.onclose = () => {
        const err = 'Lost connection to server. :('
        store.dispatch('SOCKET_ERROR', err)
        reject(err)
      }

      this.ws.onerror = err => {
        store.dispatch('SOCKET_ERROR', err)
        reject(err)
      }

      this.ws.onmessage = ({data}) => {
        const {command, params} = this.parseServerCommand(data)
        this.handleChatCommand(command, params)

        if (command === 'IDN') {
          store.dispatch('CHAT_IDENTIFY_SUCCESS', this)
          resolve()
        }
      }
    })
  }

  sendIdentifyRequest (account, ticket, character) {
    const params = {
      account, ticket, character,
      method: 'ticket',
      cname: 'fchat-next',
      cversion: '0.1.0'
    }

    this.send('IDN', params)
  }

  parseServerCommand (payload) {
    const command = payload.substring(0, 3)
    const params = payload.length > 3 ? JSON.parse(payload.substring(4)) : {}
    return {command, params}
  }

  handleChatCommand (command, params) {
    switch (command) {
      // identify with server
      case 'IDN':
        this.fetchChannelList()
        break

      /* ping~! */
      case 'PIN':
        /* pong~! */
        this.send('PIN')
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
        store.dispatch('HASH_CHARACTERS', params.characters)
        break

      // character came online
      case 'NLN':
        store.dispatch('ADD_CHARACTER', params.identity, {
          status: params.status,
          gender: params.gender,
          statusMessage: ''
        })
        break

      // character went offline
      case 'FLN':
        store.dispatch('REMOVE_CHARACTER', params.character)
        break

      // character changed status
      case 'STA':
        store.dispatch('SET_CHARACTER_STATUS', params.character, params.status, params.statusMessage)
        break

      // received list of public channels
      case 'CHA':
        store.dispatch('SET_PUBLIC_CHANNEL_LIST', params.channels)
        break

      // received list of private channels
      case 'ORS':
        store.dispatch('SET_PRIVATE_CHANNEL_LIST', params.channels)
        break

      // receiving initial channel information
      case 'ICH':
        const namelist = params.users.map(({identity}) => identity)
        store.dispatch('CHANNEL_JOIN_SUCCESS', params.channel, namelist, params.mode)
        break

      // user joined one of our channels (could be us)
      // case 'JCH':
      //   break

      default:
        console.warn(`Unknown command ${command} with params:\n`, inspect(params, { depth: null }))
    }
  }

  send (command, params) {
    if (params) {
      this.ws.send(`${command} ${JSON.stringify(params)}`)
      console.log('Sent command', command, inspect(params))
    } else {
      this.ws.send(command)
      console.log('Sent command', command)
    }
  }

  fetchChannelList () {
    this.send('CHA')
    this.send('ORS')
  }

  joinChannel (channel) {
    this.send('JCH', { channel })
  }
}
