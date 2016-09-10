// @flow
import {
  Character, Name, Status, Gender, Relationship, Category,
  Channel, ChannelInfo, ChannelMode,
  PrivateChat,
  MessageType,
  CharacterBatchEntry
} from '../types'

import state from './state'
import {newCharacter, newChannel, newMessage, newPrivateChat} from '../constructors'
import {mapToObject, assign} from '../util'
import {disconnectFromChatServer} from './socket'
import {popOverlay, pushOverlay} from './ui'
import * as flist from '../f-list'
import Vue from 'vue'

// user char state
export function setIdentity (name: Name) {
  state.identity = name
}

export function setStatus (status: Status, message: string) {
  state.status = status
  state.statusmsg = message
}

export function setCharacterList (list: Name[]) {
  state.characters = list
}

// character query maps
export function setFriends (list: Relationship[]) {
  const map = {}
  for (let {you, them} of list) {
    map[them] = map[them] || []
    map[them].push(you)
  }
  state.friends = map
}

export function setBookmarks (list: Name[]) {
  state.bookmarks = mapToObject(list, name => [name, true])
}

export function setIgnoreList (list: Name[]) {
  state.ignored = mapToObject(list, name => [name, true])
}

export function setAdminList (list: Name[]) {
  state.admins = mapToObject(list, name => [name, true])
}

// online character list management
export function addCharacterBatch (batch: CharacterBatchEntry[]) {
  const map = {}
  for (let [name, gender, status, statusmsg] of batch) {
    map[name] = newCharacter(name, gender, status, statusmsg)
  }
  state.onlineCharacters = assign({}, state.onlineCharacters, map)
}

export function addCharacter (name: Name, gender: Gender) {
  state.onlineCharacters[name] = newCharacter(name, gender)
}

export function removeCharacter (name: Name) {
  for (let id in state.activeChannels) {
    const ch: Channel = state.activeChannels[id]
    ch.characters = ch.characters.filter(n => n !== name)
  }
  delete state.onlineCharacters[name]
}

export function setCharacterStatus (name: Name, status: Status, message: string) {
  const char = state.onlineCharacters[name]
  char.status = status
  char.statusmsg = message
}

// channel listings
export function addChannels (list: ChannelInfo[]) {
  state.channelList = state.channelList.concat(list)
}

export function clearChannels () {
  state.channelList = []
}

// channel management
export function addChannelRoom (id: string, name: string) {
  Vue.set(state.activeChannels, id, newChannel(id, name))
}

export function removeChannelRoom (id: string) {
  Vue.delete(state.activeChannels, id)
}

export function isChannelJoined (id: string) {
  return state.activeChannels[id] != null
}

export function setChannelCharacters (id: string, names: Name[]) {
  state.activeChannels[id].characters = names
}

export function addChannelCharacter (id: string, name: Name) {
  state.activeChannels[id].characters.push(name)
}

export function removeChannelCharacter (id: string, name: Name) {
  const channel = state.activeChannels[id]
  channel.characters = channel.characters.filter(n => n !== name)
}

export function setChannelOps (id: string, ops: Name[]) {
  state.activeChannels[id].ops = ops
}

export function setChannelMode (id: string, mode: ChannelMode) {
  state.activeChannels[id].mode = mode
}

export function setChannelDescription (id: string, description: string) {
  state.activeChannels[id].description = description
}

export function addChannelMessage (id: string, name: Name, message: string, type: MessageType) {
  const room = state.activeChannels[id]
  room.messages.push(newMessage(name, message, type))
  if (name !== state.identity && room !== state.currentRoom) {
    room.active = true
  }
}

// private chat management
export function addPrivateRoom (partner: Name): PrivateChat {
  return Vue.set(state.activePrivateChats, partner, newPrivateChat(partner))
}

export function removePrivateRoom (partner: Name) {
  Vue.delete(state.activePrivateChats, partner)
}

export function addPrivateMessage (partner: Name, sender: Name, message: string, type: MessageType) {
  const room = state.activePrivateChats[partner] || addPrivateRoom(partner)
  room.messages.push(newMessage(sender, message, type))
  if (sender !== state.identity) {
    room.active = true
  }
}

// queries
export function isFriend (name: Name): boolean {
  return state.friends[name] != null
}

export function isBookmark (name: Name): boolean {
  return state.bookmarks[name]
}

export function isAdmin (name: Name): boolean {
  return state.admins[name]
}

export function isIgnored (name: Name): boolean {
  return state.ignored[name]
}

export function getCharacter (name: Name): Character {
  return state.onlineCharacters[name] || newCharacter(name, 'None')
}

export function getCharacterCategory (name: Name, oplist: Name[] = []): Category {
  const {status} = getCharacter(name)
  switch (true) {
    case isFriend(name):
      return 'friend'
    case isBookmark(name):
      return 'bookmark'
    case isAdmin(name):
      return 'admin'
    case oplist.includes(name):
      return 'op'
    case status === 'looking':
      return 'looking'
    default:
      return 'none'
  }
}

// user actions
export function addBookmark (name: Name): Promise<void> {
  return flist.addBookmark(state.account, state.ticket, name)
  .then(() => {
    Vue.set(state.bookmarks, name, true)
  })
}

export function removeBookmark (name: Name): Promise<void> {
  return flist.removeBookmark(state.account, state.ticket, name)
  .then(() => {
    Vue.delete(state.bookmarks, name)
  })
}

export function addIgnored (name: Name) {
  Vue.set(state.ignored, name, true)
}

export function removeIgnored (name: Name) {
  Vue.delete(state.ignored, name)
}

export function logOut () {
  disconnectFromChatServer()
  popOverlay()
  pushOverlay('login')
}

export function switchCharacter () {
  disconnectFromChatServer()
  popOverlay()
  pushOverlay('character-select')
}
