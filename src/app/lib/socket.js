// @flow
import * as store from './store.new'

const {WebSocket} = window

const serverCommands = {
  IDN () {
    console.info('Successfully identified with server.')
    store.setSocketState('identified')
  },

  HLO (params) { console.info(params.message) },
  CON (params) { console.info(`There are ${params.count} characters online.`) },

  /* ping~! */
  PIN () {
    /* pong~! */
    sendCommand('PIN')
  },

  // ignored we get friends from login
  FRL () {},

  IGN (params) {
    switch (params.action) {
      case 'init':
      case 'list':
        store.setIgnoreList(params.characters)
        break

      case 'add':
        store.addIgnored(params.character)
        break

      case 'delete':
        store.removeIgnored(params.character)
        break

      default:
        console.warn(`Unknown ignore action "${params.action}"`, params)
    }
  },

  LIS (params) {
    store.addCharacterBatch(params.characters)
  },

  ADL (params) {
    store.setAdminList(params.ops)
  },

  // character came online
  NLN ({ identity: name, gender }) {
    store.addCharacter(name, gender)
    if (store.isFriend(name) || store.isBookmark(name)) {
      store.showSilentNotification(`${name} is online!`)
    }
  },

  // character went offline
  FLN ({ character: name }) {
    store.removeCharacter(name)
    if (store.isFriend(name) || store.isBookmark(name)) {
      store.showSilentNotification(`${name} went offline. :(`)
    }
  },

  // character updated status
  STA ({ character: name, status, statusmsg }) {
    store.setCharacterStatus(name, status, statusmsg)
    if (store.isFriend(name) || store.isBookmark(name)) {
      store.showSilentNotification(
        `${name} changed their status: ${status}, ${statusmsg}`)
    }
  },

  // public channel list
  CHA (params) {
    const channels = params.channels.map(ch => ({ id: ch.name, name: ch.name, users: ch.characters }))
    store.addChannels(channels)
  },

  // private channel list
  ORS (params) {
    const channels = params.channels.map(ch => ({ id: ch.name, name: ch.title, users: ch.characters }))
    store.addChannels(channels)
  },

  // someone joined a channel
  // if it's us add a new chat
  JCH (params) {
    if (params.character.identity === store.state.identity) {
      store.addChannelRoom(params.channel, params.title)
    } else {
      store.addChannelCharacter(params.channel, params.character.identity)
    }
  },

  // someone left a channel
  // if it's us remove that channel
  LCH (params) {
    store.removeChannelCharacter(params.channel, params.character)
    if (params.character === store.state.identity) {
      store.removeChannelRoom(params.channel)
    }
  },

  // list of ops for a channel
  COL (params) {
    store.setChannelOps(params.channel, params.oplist)
  },

  // initial channel information
  ICH (params) {
    const names = params.users.map(user => user.identity)
    store.setChannelCharacters(params.channel, names)
    store.setChannelMode(params.channel, params.mode)
  },

  // channel description update
  CDS (params) {
    store.setChannelDescription(params.channel, params.description)
  },

  // channel message
  MSG ({ character: name, channel, message }) {
    store.addChannelMessage(channel, name, message,
      store.isBookmark(name) || store.isFriend(name) ? 'friend' : 'chat')
  },

  // LFRP message
  LRP (params) {
    store.addChannelMessage(params.channel, params.character, params.message, 'lfrp')
  },

  // private message
  PRI ({ character: name, message }) {
    store.addPrivateMessage(name, name, message, 'chat')

    const chat = store.state.getCurrentChat()
    if (!document.hasFocus() || !(chat != null && chat.type === 'private' && chat.state.partner.name === name)) {
      store.showNotification(`${name}: ${message}`, 4000, () => {
        // store.setPrivateRoom(name)
      })
    }
  },

  VAR () {}
}

const state = {
  ws: (null: ?WebSocket)
}

function connect () {
  state.ws = new window.WebSocket('wss://chat.f-list.net:9799')
  return state.ws
}

function disconnect () {
  if (state.ws) state.ws.close()
}

function sendCommand (command: string, params?: Object) {
  const data = params ? `${command} ${JSON.stringify(params)}` : command
  if (state.ws) {
    state.ws.send(data)
    console.log(`Sent command: ${data}`)
  }
}

function handleCommand (command: string, params: Object) {
  serverCommands[command]
    ? serverCommands[command](params)
    : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
}

function isConnected () {
  return state.ws != null
}

export { connect, disconnect, sendCommand, handleCommand, isConnected }
