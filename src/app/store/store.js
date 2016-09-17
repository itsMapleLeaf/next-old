// @flow
import type {
  Name, CharacterBatchEntry, ChatTab, Relationship
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
    state.appState = 'setup'
    storage.getItem('auth')
    .then(auth => {
      return auth || Promise.reject()
    })
    .then(auth => {
      return this.fetchUserData(auth.account, auth.ticket).then(() => auth)
    })
    .then(auth => {
      state.appState = 'character-select'
    })
    .catch(() => {
      state.appState = 'login'
    })
  },

  fetchUserData (account: string, ticket: string) {
    return Promise.all([
      flist.getCharacters(account, ticket),
      flist.getFriends(account, ticket),
      flist.getBookmarks(account, ticket)
    ])
    .then(([ characters, friends, bookmarks ]) => {
      this.setAuthInfo(account, ticket)
      state.userCharacters = characters
      state.friends = this.mapFriends(friends)
      state.bookmarks = mapToObject(bookmarks, name => [name, true])
    })
  },

  mapFriends (friends: Relationship[]) {
    const map = {}
    for (const {you, them} of friends) {
      map[them] = map[them] || []
      map[them].push(you)
    }
    return map
  },

  login (account: string, password: string, remember: boolean): Promise<void> {
    state.appState = 'logging-in'

    return flist.getTicket(account, password)
    .then(ticket => {
      if (remember) {
        storage.setItem('auth', { account, ticket })
      } else {
        storage.clear()
      }
      return this.fetchUserData(account, ticket)
    })
    .then(() => {
      state.appState = 'character-select'
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

  chooseCharacter (name: Name) {
    state.identity = name
    store.connectToChatServer()
  },

  saveChatTabs (identity: Name) {
    const data = state.chatTabs.map(tab => {
      if (tab.channel) {
        return { channel: tab.channel.id, name: tab.channel.name }
      } else if (tab.privateChat) {
        return { privateChat: tab.privateChat.partner.name }
      }
    })
    storage.setItem(`tabs:${identity}`, data)
  },

  loadChatTabs (identity: Name) {
    state.chatTabs = []
    storage.getItem(`tabs:${identity}`).then(tabs => {
      if (!tabs) return
      for (const tab of tabs) {
        if (tab.channel) {
          this.joinChannel(tab.channel, tab.name)
        }
      }
    })
  },

  connectToChatServer () {
    if (state.socket) {
      state.socket.onclose = () => {}
      state.socket.close()
    }

    state.appState = 'connecting'

    const socket = new window.WebSocket('wss://chat.f-list.net:9799')

    socket.onopen = () => {
      console.log('Socket opened')
      state.appState = 'identifying'
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
      this.init()
    }

    socket.onerror = (err) => {
      console.error('Socket error:', err)
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
  },

  joinChannel (id: string, name: string) {
    const channel = state.channels[id] || Vue.set(state.channels, id, newChannel(id, name))
    state.chatTabs.push({ channel })
    this.saveChatTabs(state.identity)
    this.sendCommand('JCH', { channel: id })
  },

  leaveChannel (id: string) {
    state.chatTabs = state.chatTabs.filter((tab: ChatTab) => {
      return !(tab.channel && tab.channel.id === id)
    })
    this.saveChatTabs(state.identity)
    this.sendCommand('LCH', { channel: id })
  },

  isChannelJoined (id: string) {
    return state.chatTabs.some(tab => tab.channel && tab.channel.id === id)
  },

  isFriend (name: Name) { return state.friends[name] != null },
  isBookmark (name: Name) { return state.bookmarks[name] != null },
  isAdmin (name: Name) { return state.admins[name] != null },

  setCharacterFocus (name?: Name) {
    state.characterMenuFocus = name ? state.onlineCharacters[name] : null
  }
}

const serverCommands = {
  IDN () {
    console.info('Successfully identified with server.')
    state.appState = 'online'
    store.loadChatTabs(state.identity)
  },

  HLO (params) {
    console.info(params.message)
  },

  /* ping~! */
  PIN () {
    store.sendCommand('PIN') /* pong ~! */
  },

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
