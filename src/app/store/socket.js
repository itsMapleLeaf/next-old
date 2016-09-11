// @flow
import {state} from './state'
import {showSilentNotification} from './ui'
import * as chat from './chat'
import meta from '../../../package.json'
import type {Status, SocketState} from '../lib/types'

// export function isConnected () {
// }

export function setSocketState (socketState: SocketState) {
  state.socketState = socketState
}

export function connect () {
  const ws = new window.WebSocket('wss://chat.f-list.net:9799')

  ws.onopen = () => {
    console.log('Socket opened')
    setSocketState('connected')
    identify()
  }

  ws.onclose = () => {
    console.log('Socket closed')
    setSocketState('offline')
  }

  ws.onerror = (err) => {
    console.error('Socket error:', err)
    setSocketState('offline')
  }

  ws.onmessage = (msg) => {
    const {data} = msg
    const command = data.substring(0, 3)
    const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}
    handleCommand(command, params)
  }

  state.socket = ws
}

export function disconnect () {
  if (state.socket) state.socket.close()
}

export function identify () {
  sendCommand('IDN', {
    method: 'ticket',
    account: state.account,
    ticket: state.ticket,
    character: state.identity,
    cname: meta.name,
    cversion: meta.version
  })
}

export function requestChannels () {
  chat.clearChannels()
  sendCommand('CHA')
  sendCommand('ORS')
}

export function joinChannel (channel: string) {
  sendCommand('JCH', { channel })
}

export function leaveChannel (channel: string) {
  sendCommand('LCH', { channel })
}

export function sendChannelMessage (channel: string, message: string) {
  sendCommand('MSG', { channel, message })
}

export function sendPrivateMessage (recipient: string, message: string) {
  sendCommand('PRI', { recipient, message })
}

export function updateStatus (status: Status, statusmsg: string) {
  sendCommand('STA', { status, statusmsg })
  chat.setStatus(status, statusmsg)
}

export function ignoreAction (character: string, action: string) {
  // action can be: 'add', 'delete', 'notify', or 'list'
  // https://wiki.f-list.net/F-Chat_Client_Commands#IGN
  sendCommand('IGN', { character, action })
}

function sendCommand (command: string, params?: Object) {
  const data = params ? `${command} ${JSON.stringify(params)}` : command
  if (state.socket) {
    state.socket.send(data)
    console.log(`Sent command: ${data}`)
  }
}

function handleCommand (command: string, params: Object) {
  serverCommands[command]
    ? serverCommands[command](params)
    : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
}

const serverCommands = {
  IDN () {
    console.info('Successfully identified with server.')
    setSocketState('identified')
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
        chat.setIgnoreList(params.characters)
        break

      case 'add':
        chat.addIgnored(params.character)
        break

      case 'delete':
        chat.removeIgnored(params.character)
        break

      default:
        console.warn(`Unknown ignore action "${params.action}"`, params)
    }
  },

  LIS (params) {
    chat.addCharacterBatch(params.characters)
  },

  ADL (params) {
    chat.setAdminList(params.ops)
  },

  // character came online
  NLN ({ identity: name, gender }) {
    chat.addCharacter(name, gender)
    if (chat.isFriend(name) || chat.isBookmark(name)) {
      showSilentNotification(`${name} is online.`)
    }
  },

  // character went offline
  FLN ({ character: name }) {
    chat.removeCharacter(name)
    if (chat.isFriend(name) || chat.isBookmark(name)) {
      showSilentNotification(`${name} is offline.`)
    }
  },

  // character updated status
  STA ({ character: name, status, statusmsg }) {
    chat.setCharacterStatus(name, status, statusmsg)
    if (chat.isFriend(name) || chat.isBookmark(name)) {
      showSilentNotification(
        `${name} is now ${status}, "${statusmsg}"`)
    }
  },

  // public channel list
  CHA (params) {
    const channels = params.channels.map(ch => ({ id: ch.name, name: ch.name, users: ch.characters }))
    chat.addChannels(channels)
  },

  // private channel list
  ORS (params) {
    const channels = params.channels.map(ch => ({ id: ch.name, name: ch.title, users: ch.characters }))
    chat.addChannels(channels)
  },

  // someone joined a channel
  // if it's us add a new chat
  JCH (params) {
    if (params.character.identity === state.identity) {
      chat.addChannelRoom(params.channel, params.title)
    } else {
      chat.addChannelCharacter(params.channel, params.character.identity)
    }
  },

  // someone left a channel
  // if it's us remove that channel
  LCH (params) {
    chat.removeChannelCharacter(params.channel, params.character)
    if (params.character === state.identity) {
      chat.removeChannelRoom(params.channel)
    }
  },

  // list of ops for a channel
  COL (params) {
    chat.setChannelOps(params.channel, params.oplist)
  },

  // initial channel information
  ICH (params) {
    const names = params.users.map(user => user.identity)
    chat.setChannelCharacters(params.channel, names)
    chat.setChannelMode(params.channel, params.mode)
  },

  // channel description update
  CDS (params) {
    chat.setChannelDescription(params.channel, params.description)
  },

  // channel message
  MSG ({ character: name, channel, message }) {
    chat.addChannelMessage(channel, name, message,
      chat.isBookmark(name) || chat.isFriend(name) ? 'friend' : 'chat')
  },

  // LFRP message
  LRP (params) {
    chat.addChannelMessage(params.channel, params.character, params.message, 'lfrp')
  },

  // private message
  PRI ({ character: name, message }) {
    chat.addPrivateMessage(name, name, message, 'chat')

    // const chat = state.getCurrentChat()
    // if (!document.hasFocus() || !(chat != null && chat.type === 'private' && chat.state.partner.name === name)) {
    //   chat.showNotification(`${name}: ${message}`, 4000, () => {
    //     // chat.setPrivateRoom(name)
    //   })
    // }
  },

  VAR () {}
}
