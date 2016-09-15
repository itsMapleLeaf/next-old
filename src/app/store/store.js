// @flow
import type {Name, CharacterBatchEntry} from '../lib/types'
import {state} from './state'
import {newCharacter, newChannelInfo} from '../lib/constructors'
import {assign, mapToObject} from '../lib/util'
import storage from 'localforage'
import * as flist from '../lib/f-list'
import * as meta from '../../../package.json'

export const store = {
  init () {
    this.authenticate()
  },

  authenticate () {
    state.loadingMessage = 'Setting things up...'
    storage.getItem('auth').then(auth => {
      return auth ? Promise.resolve(auth) : Promise.reject()
    })
    .then(({ account, ticket }) => {
      state.account = account
      state.ticket = ticket
      return this.openCharacterList(account, ticket)
    })
    .then(() => {
      state.loadingMessage = ''
    })
    .catch(() => {
      state.loadingMessage = ''
      state.currentView = 'Login'
    })
  },

  login (account: string, password: string, remember: boolean): Promise<void> {
    state.loadingMessage = 'Logging in...'
    return flist.getTicket(account, password).then(ticket => {
      const data = { account, ticket }
      if (remember) {
        storage.setItem('auth', data)
      } else {
        storage.clear()
      }
      return data
    })
    .then(auth => {
      return this.openCharacterList(auth.account, auth.ticket)
    })
    .then(() => {
      state.loadingMessage = ''
    })
    .catch(err => {
      return Promise.reject(err || `
        Could not connect to the F-list website.
        Either they're doing maintenance,
        or someone spilled coke on the servers again.
      `)
    })
  },

  setIdentity (name: Name) {
    state.identity = name
    state.currentView = 'Chat'
  },

  openCharacterList (account: string, ticket: string): Promise<void> {
    return flist.getCharacters(account, ticket).then(characters => {
      state.userCharacters = characters
      state.currentView = 'CharacterList'
    })
  },

  connectToChatServer () {
    if (state.socket) return

    state.loadingMessage = 'Connecting...'
    const socket = new window.WebSocket('wss://chat.f-list.net:9799')

    socket.onopen = () => {
      state.loadingMessage = 'Identifying...'
      console.log('Socket opened')

      this.sendCommand('IDN', {
        method: 'ticket',
        account: state.account,
        ticket: state.ticket,
        character: state.identity,
        cname: meta.name,
        cversion: meta.version
      })
    }

    socket.onclose = () => {
      console.log('Socket closed')
      state.loadingMessage = ''
      state.currentView = 'Login'
    }

    socket.onerror = (err) => {
      console.error('Socket error:', err)
      state.loadingMessage = ''
      state.currentView = 'Login'
    }

    socket.onmessage = (msg) => {
      const {data} = msg
      const cmd = data.substring(0, 3)
      const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}
      this.handleServerCommand(cmd, params)
    }

    state.socket = socket
  },

  handleServerCommand (cmd: string, params: Object) {
    const handler = serverCommands[cmd]
    handler ? handler(params) : console.info('Unknown socket command', cmd, params)
  },

  sendCommand (cmd: string, params?: Object) {
    if (state.socket) {
      if (params) {
        state.socket.send(`${cmd} ${JSON.stringify(params)}`)
      } else {
        state.socket.send(cmd)
      }
    }
  },

  addCharacterBatch (batch: CharacterBatchEntry[]) {
    const map = {}
    for (const [name, gender, status, statusmsg] of batch) {
      map[name] = newCharacter(name, gender, status, statusmsg)
    }
    state.onlineCharacters = assign({}, state.onlineCharacters, map)
  },

  fetchChannelList () {
    this.sendCommand('CHA')
    this.sendCommand('ORS')
  }
}

const serverCommands = {
  IDN () {
    console.info('Successfully identified with server.')
    state.loadingMessage = ''
  },
  HLO (params) { console.info(params.message) },
  PIN () { store.sendCommand('PIN') },
  ERR (params) { console.info('Socket error', params.message) },

  CON () {},
  FRL () {},

  IGN (params) {
    if (params.action === 'init') {
      state.ignored = mapToObject(params.characters, name => [name, true])
    }
  },

  ADL (params) {
    state.admins = mapToObject(params.ops, name => [name, true])
  },

  LIS (params) {
    store.addCharacterBatch(params.characters)
  },

  NLN ({ identity, gender }) {
    state.onlineCharacters[identity] = newCharacter(identity, gender)
  },

  FLN ({ character }) {
    delete state.onlineCharacters[character]
  },

  STA ({ character, status, statusmsg }) {
    const char = state.onlineCharacters[character]
    char.status = status
    char.statusmsg = statusmsg
  },

  CHA ({ channels }) {
    const list = channels.map(ch => newChannelInfo(ch.name, ch.name, ch.characters, ch.mode))
    state.publicChannelList = list
  },

  ORS ({ channels }) {
    const list = channels.map(ch => newChannelInfo(ch.name, ch.title, ch.characters, ch.mode))
    state.privateChannelList = list
  }
}
