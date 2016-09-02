import * as store from './store'

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

  LIS (params) { store.addCharacterBatch(params.characters) },
  ADL (params) { store.setAdminList(params.ops) },
  NLN (params) { store.addCharacter(params.identity, params.gender) },
  FLN (params) { store.removeCharacter(params.character) },
  STA (params) { store.setCharacterStatus(params.character, params.status, params.statusmsg) },

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
  MSG (params) {
    store.addChannelMessage(params.channel, params.character, params.message, 'chat')
  },

  // LFRP message
  LRP (params) {
    store.addChannelMessage(params.channel, params.character, params.message, 'lfrp')
  },

  // private message
  PRI (params) {
    store.addPrivateMessage(params.character, params.character, params.message, 'chat')
    if (!document.hasFocus() || store.state.currentRoom.partner !== params.character) {
      const message = `${params.character}: ${params.message}`
      store.showMessageBubble(message)
      store.logMessage(message)
      store.incrementUnreadMessageCount()
      store.playNotificationSound()
    }
  },

  VAR () {}
}

let ws = null

function connect () {
  ws = new window.WebSocket('wss://chat.f-list.net:9799')
  return ws
}

function disconnect () {
  ws.close()
}

function sendCommand (command, params) {
  const data = params ? `${command} ${JSON.stringify(params)}` : command
  ws.send(data)
  console.log(`Sent command: ${data}`)
}

function handleCommand (command, params) {
  serverCommands[command]
    ? serverCommands[command](params)
    : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
}

function isConnected () {
  return ws != null
}

export { connect, disconnect, sendCommand, handleCommand, isConnected }
