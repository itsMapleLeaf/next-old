import store from './vuex/store'
import {inspect} from 'util'
import {ChannelInfo} from './models'

const urls = {
  mainInsecure: 'ws://chat.f-list.net:9722',
  main: 'wss://chat.f-list.net:9799',
  testInsecure: 'ws://chat.f-list.net:8722',
  test: 'ws://chat.f-list.net:8799'
}

export default class SocketHandler {
  constructor () {
    this.callbacks = {
      privateMessageReceived () {},
      channelJoined () {}
    }
  }

  connect (urlID, userData) {
    return new Promise((resolve, reject) => {
      /* eslint no-undef: 0 */
      this.ws = new WebSocket(urls[urlID])

      this.ws.onopen = () => {
        this.sendIdentifyRequest(userData)
      }

      this.ws.onclose = () => {
        const err = 'Lost connection to server. :('
        reject(err)
      }

      this.ws.onerror = err => {
        reject(err)
      }

      this.ws.onmessage = ({data}) => {
        const {command, params} = this.parseServerCommand(data)
        this.handleChatCommand(command, params)

        if (command === 'IDN') {
          resolve()
        }
      }
    })
  }

  sendIdentifyRequest ({account, ticket, character}) {
    const params = {
      account,
      ticket,
      character,
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
        store.dispatch('ADD_CHARACTER', params.identity, params.gender)
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
      case 'CHA': {
        const toChannelInfo = ({ name, characters }) => ChannelInfo(name, name, characters)
        const list = params.channels.map(toChannelInfo)
        store.dispatch('SET_PUBLIC_CHANNEL_LIST', list)
        break
      }

      // received list of private channels
      case 'ORS': {
        const toChannelInfo = ({ name, title, characters }) => ChannelInfo(name, title, characters)
        const list = params.channels.map(toChannelInfo)
        store.dispatch('SET_PRIVATE_CHANNEL_LIST', list)
        break
      }

      // receiving initial channel information
      case 'ICH':
        const namelist = params.users.map(({identity}) => identity)
        store.dispatch('CHANNEL_INIT', params.channel, namelist, params.mode)
        this.callbacks.channelJoined(params.channel)
        break

      // receiving a channel description
      case 'CDS':
        store.dispatch('SET_CHANNEL_DESCRIPTION', params.channel, params.description)
        break

      // user joined a channel (could be us)
      case 'JCH':
        store.dispatch('CHANNEL_JOIN', params.channel, params.character.identity)
        break

      // user left a channel (could be us)
      case 'LCH':
        store.dispatch('CHANNEL_LEAVE', params.channel, params.character)
        break

      // channel message
      case 'MSG':
        store.dispatch('RECEIVED_CHANNEL_MESSAGE', params.channel, params.character, params.message)
        break

      // private message
      case 'PRI':
        store.dispatch('RECEIVED_PRIVATE_MESSAGE', params.character, params.message)
        this.callbacks.privateMessageReceived(params.character, params.message)
        break

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

  joinChannel (id) {
    this.send('JCH', { channel: id })
    store.dispatch('JOIN_CHANNEL_REQUEST', id)
  }

  leaveChannel (id) {
    this.send('LCH', { channel: id })
    store.dispatch('LEAVE_CHANNEL_REQUEST', id)
  }

  sendChannelMessage (channel, message) {
    this.send('MSG', { channel, message })
  }

  sendPrivateMessage (recipient, message) {
    this.send('PRI', { recipient, message })
    store.dispatch('SENT_PRIVATE_MESSAGE', recipient, message)
  }
}
