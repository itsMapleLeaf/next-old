// @flow
import type {Name, CharacterBatchEntry, ChatTab, Relationship, Status} from '../lib/types'
import {newCharacter, newChannel, newPrivateChat, newMessage} from '../lib/constructors'
import {state} from './state'
import {mapToObject} from '../lib/util'
import * as serverCommands from './server-commands'
import * as flist from '../lib/f-list'
import meta from '../../package.json'
import Vue from 'vue'
import storage from 'localforage'

function mapFriends(friends: Relationship[]) {
  const map = {}
  for (const {you, them} of friends) {
    map[them] = map[them] || []
    map[them].push(you)
  }
  return map
}

export async function initialize() {
  state.appState = 'setup'

  try {
    const auth = await storage.getItem('auth')
    if (auth) {
      await fetchUserData(auth.account, auth.ticket)
      state.appState = 'character-select'
    }
  }
  catch (err) {
    console.info(`Couldn't fetch userdata: ${err}`)
    state.appState = 'login'
  }
}

export async function fetchUserData(account: string, ticket: string) {
  const [ characters, friends, bookmarks ] = await Promise.all([
    flist.getCharacters(account, ticket),
    flist.getFriends(account, ticket),
    flist.getBookmarks(account, ticket),
  ])
  setAuthInfo(account, ticket)
  state.userCharacters = characters
  state.friends = mapFriends(friends)
  state.bookmarks = mapToObject(bookmarks, name => [name, true])
}

export function showLogin() {
  state.appState = 'login'
}

export async function login(account: string, password: string, remember: boolean): Promise<void> {
  state.appState = 'logging-in'

  try {
    const ticket = await flist.getTicket(account, password)
    if (remember) {
      storage.setItem('auth', { account, ticket })
    } else {
      storage.clear()
    }

    await this.fetchUserData(account, ticket)
    state.appState = 'character-select'
  }
  catch (err) {
    throw (err ||
      "Could not connect to the F-list website. " +
      "Either they're doing maintenance, " +
      "or someone spilled coke on the servers again."
    )
  }
}

export function setAuthInfo(account: string, ticket: string) {
  state.account = account
  state.ticket = ticket
}

export function chooseCharacter(name: Name) {
  state.identity = name
  connectToChatServer()
}

export function saveChatTabs(identity: Name) {
  const data = state.chatTabs.map(tab => {
    if (tab.channel) {
      return { channel: tab.channel.id, name: tab.channel.name }
    } else if (tab.privateChat) {
      return { privateChat: tab.privateChat.partner.name }
    }
  })
  storage.setItem(`tabs:${identity}`, data)
}

export function loadChatTabs(identity: Name) {
  state.chatTabs = []
  storage.getItem(`tabs:${identity}`).then(tabs => {
    if (!tabs) return
    for (const tab of tabs) {
      if (tab.channel) {
        this.joinChannel(tab.channel, tab.name)
      }
    }
  })
}

export function connectToChatServer() {
  if (state.socket) {
    state.socket.onclose = () => {}
    state.socket.close()
  }

  state.appState = 'connecting'

  const socket = new window.WebSocket('wss://chat.f-list.net:9799')

  socket.onopen = () => {
    console.log('Socket opened')
    state.appState = 'identifying'
    sendCommand('IDN', {
      method: 'ticket',
      account: state.account,
      ticket: state.ticket,
      character: state.identity,
      cname: meta.name,
      cversion: meta.version,
    })
  }

  socket.onclose = () => {
    console.log('Socket closed')
    initialize()
  }

  socket.onerror = (err) => {
    console.error('Socket error:', err)
  }

  socket.onmessage = (msg) => {
    const {data} = msg
    const cmd = data.substring(0, 3)
    const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}
    handleServerCommand(cmd, params)
  }

  state.socket = socket
}

export function disconnectFromChatServer() {
  if (state.socket) state.socket.close()
}

export function handleServerCommand(cmd: string, params: Object) {
  const handler = serverCommands[cmd]
  handler ? handler(params) : console.info('Unknown socket command', cmd, params)
}

export function sendCommand(cmd: string, params?: Object) {
  if (state.socket) {
    if (params) {
      state.socket.send(`${cmd} ${JSON.stringify(params)}`)
    } else {
      state.socket.send(cmd)
    }
  }
}

export function addCharacterBatch(batch: CharacterBatchEntry[]) {
  const map = {}
  for (const [name, gender, status, statusmsg] of batch) {
    map[name] = newCharacter(name, gender, status, statusmsg)
  }
  state.onlineCharacters = { ...state.onlineCharacters, ...map }
}

export function fetchChannelList() {
  this.sendCommand('CHA')
  this.sendCommand('ORS')
}

export function joinChannel(id: string, name: string) {
  const channel = state.channels[id] || Vue.set(state.channels, id, newChannel(id, name))
  state.chatTabs.push({ channel })
  this.saveChatTabs(state.identity)
  this.sendCommand('JCH', { channel: id })
}

export function leaveChannel(id: string) {
  state.chatTabs = state.chatTabs.filter((tab: ChatTab) => {
    return !(tab.channel && tab.channel.id === id)
  })
  this.saveChatTabs(state.identity)
  this.sendCommand('LCH', { channel: id })
}

export function isChannelJoined(id: string) {
  return state.chatTabs.some(tab => tab.channel && tab.channel.id === id)
}

export function openPrivateChat(partner: Name) {
  const char = state.onlineCharacters[partner]
  const privateChat = state.privateChats[partner] || Vue.set(state.privateChats, partner, newPrivateChat(char))
  state.chatTabs.push({ privateChat })
  return privateChat
}

export function closePrivateChat(partner: Name) {
  const filter = tab => !(tab.privateChat && tab.privateChat.partner.name === partner)
  state.chatTabs = state.chatTabs.filter(filter)
}

export function isPrivateChatOpened(partner: Name) {
  return state.chatTabs.some(tab => tab.privateChat && tab.privateChat.partner.name === partner)
}

export function sendChannelMessage(id: string, message: string) {
  const char = state.onlineCharacters[state.identity]
  state.channels[id].messages.push(newMessage(char, message, 'self'))
  sendCommand('MSG', { channel: id, message })
}

export function sendPrivateMessage(partner: Name, message: string) {
  const char = state.onlineCharacters[state.identity]
  state.privateChats[partner].messages.push(newMessage(char, message, 'self'))
  sendCommand('PRI', { recipient: partner, message })
}

export function addBookmark(name: Name) {
  Vue.set(state.bookmarks, name, true)
  flist.addBookmark(state.account, state.ticket, name)
}

export function removeBookmark(name: Name) {
  Vue.delete(state.bookmarks, name)
  flist.removeBookmark(state.account, state.ticket, name)
}

export function updateStatus(status: Status, statusmsg: string) {
  sendCommand('STA', { status, statusmsg })
}

export function setCharacterFocus(name?: Name) {
  state.characterMenuFocus = name ? state.onlineCharacters[name] : null
}

export function isFriend(name: Name) { return state.friends[name] != null }
export function isBookmark(name: Name) { return state.bookmarks[name] != null }
export function isAdmin(name: Name) { return state.admins[name] != null }
