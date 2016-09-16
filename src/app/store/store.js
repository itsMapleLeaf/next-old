// @flow
import type {
  Name, CharacterBatchEntry, ChannelInfo, ChatTab
} from '../lib/types'

import {
  newCharacter, newChannel, newChannelInfo, newMessage
} from '../lib/constructors'

import Vue from 'vue'
import storage from 'localforage'
import {state} from './state'
import {assign, mapToObject} from '../lib/util'
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
      this.setAuthInfo(account, ticket)
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
      this.setAuthInfo(account, ticket)
      if (remember) {
        storage.setItem('auth', { account, ticket })
      } else {
        storage.clear()
      }
      return { account, ticket }
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

  setAuthInfo (account: string, ticket: string) {
    state.account = account
    state.ticket = ticket
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
    if (state.socket) {
      state.chatTabs = []
      state.socket.onclose = () => {}
      state.socket.close()
    }

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

  fetchUserData () {
    const {account, ticket} = state
    flist.getFriends(account, ticket).then(res => {
      const map = {}
      for (const {you, them} of res) {
        map[them] = map[them] || []
        map[them].push(you)
      }
      state.friends = map
    })

    flist.getBookmarks(account, ticket).then(res => {
      state.bookmarks = mapToObject(res, name => [name, true])
    })
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
  },

  joinChannel (id: string, name: string) {
    const channel = state.channels[id] || Vue.set(state.channels, id, newChannel(id, name))
    state.chatTabs.push({ type: 'channel', channel })
    this.sendCommand('JCH', { channel: id })
  },

  leaveChannel (id: string) {
    state.chatTabs = state.chatTabs.filter((tab: ChatTab) => {
      return !(tab.type === 'channel' && tab.channel.id === id)
    })
    this.sendCommand('LCH', { channel: id })
  },

  isFriend (name: Name) { return state.friends[name] != null },
  isBookmark (name: Name) { return state.bookmarks[name] != null },
  isAdmin (name: Name) { return state.admins[name] != null }
}

const serverCommands = {
  IDN () {
    console.info('Successfully identified with server.')
    state.loadingMessage = ''
  },
  HLO (params) { console.info(params.message) },
  PIN () { store.sendCommand('PIN') },
  ERR (params) {
    console.info('Socket error', params.message)
  },

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
  },

  JCH ({ channel: id, title, character: { identity: name } }) {
    state.channels[id].name = title
    state.channels[id].users.push(state.onlineCharacters[name])
  },

  LCH ({ channel: id, character: name }) {
    const channel = state.channels[id]
    channel.users = channel.users.filter(char => char.name !== name)
  },

  COL ({ channel: id, oplist }) {
    state.channels[id].ops = oplist
  },

  ICH ({ channel: id, mode, users }) {
    const channel = state.channels[id]
    const userlist = users.map(({ identity }) => state.onlineCharacters[identity])
    channel.mode = mode
    channel.users = channel.users.concat(userlist)
  },

  CDS ({ channel: id, description }) {
    state.channels[id].description = description
  },

  MSG ({ channel: id, character: name, message }) {
    const char = state.onlineCharacters[name]
    state.channels[id].messages.push(newMessage(char, message, 'chat'))
  },

  LRP ({ channel: id, character: name, message }) {
    const char = state.onlineCharacters[name]
    state.channels[id].messages.push(newMessage(char, message, 'lfrp'))
  }
}
