import state from './state'
import {Character, Channel, Message, PrivateChat} from '../models.new'
import {mapToObject, values, assign, remove} from '../util'
import {disconnectFromChatServer, popOverlay, pushOverlay} from ''
import * as flist from '../flist'
import Vue from 'vue'

// user char state
export function setIdentity (name) {
  state.identity = name
}

export function setStatus (status, message) {
  state.status = status
  state.statusmsg = message
}

export function setCharacterList (list) {
  state.characters = list
}

// character query maps
export function setFriends (list) {
  const map = {}
  for (let {you, them} of list) {
    map[them] = map[them] || []
    map[them].push(you)
  }
  state.friends = map
}

export function setBookmarks (list) {
  state.bookmarks = mapToObject(list, name => [name, true])
}

export function setIgnoreList (list) {
  state.ignored = mapToObject(list, name => [name, true])
}

export function setAdminList (list) {
  state.admins = mapToObject(list, name => [name, true])
}

// online character list management
export function addCharacterBatch (batch) {
  const map = {}
  for (let [name, gender, status, statusmsg] of batch) {
    map[name] = Character(name, gender, status, statusmsg)
  }
  assign(state.onlineCharacters, map)
}

export function addCharacter (name, gender) {
  state.onlineCharacters[name] = Character(name, gender)
}

export function removeCharacter (name) {
  for (let room of values(state.activeChannels)) {
    room.characters = remove(room.characters, name)
  }
  delete state.onlineCharacters[name]
}

export function setCharacterStatus (name, status, message) {
  const char = state.onlineCharacters[name]
  char.status = status
  char.statusmsg = message
}

// channel listings
export function addChannels (list) {
  state.channelList = state.channelList.concat(list)
}

export function clearChannels () {
  state.channelList = []
}

// channel management
export function addChannelRoom (id, name) {
  Vue.set(state.activeChannels, id, Channel(id, name))
}

export function removeChannelRoom (id) {
  Vue.delete(state.activeChannels, id)
}

export function isChannelJoined (id) {
  return state.activeChannels[id] != null
}

export function setChannelCharacters (id, names) {
  state.activeChannels[id].characters = names
}

export function addChannelCharacter (id, name) {
  state.activeChannels[id].push(name)
}

export function removeChannelCharacter (id, name) {
  const channel = state.activeChannels[id]
  channel.characters = remove(channel.characters, name)
}

export function setChannelOps (id, ops) {
  state.activeChannels[id].ops = ops
}

export function setChannelMode (id, mode) {
  state.activeChannels[id].mode = mode
}

export function setChannelDescription (id, description) {
  state.activeChannels[id].description = description
}

export function addChannelMessage (id, name, message, type) {
  const room = state.activeChannels[id]
  room.messages.push(Message(name, message, type))
  if (name !== state.identity && room !== state.currentRoom) {
    room.active = true
  }
}

// private chat management
export function addPrivateRoom (partnerName) {
  const room = PrivateChat(partnerName)
  state.rooms.push(room)
  state.privateRooms[partnerName] = room
  return room
}

export function removePrivateRoom (partnerName) {
  const room = state.privateRooms[partnerName]
  delete state.privateRooms[partnerName]
  state.rooms = remove(state.rooms, room)
}

export function addPrivateMessage (partnerName, senderName, message, type) {
  const room = state.privateRooms[partnerName] || addPrivateRoom(partnerName)
  room.messages.push(Message(senderName, message, type))
  if (senderName !== state.identity && room !== state.currentRoom) {
    room.active = true
  }
}

// queries
export function isFriend (name) {
  return state.friends[name] != null
}

export function isBookmark (name) {
  return state.bookmarks[name]
}

export function isAdmin (name) {
  return state.admins[name]
}

export function isIgnored (name) {
  return state.ignored[name]
}

export function getCharacterCategory (char, oplist = []) {
  const {name, status} = char
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
export function addBookmark (name) {
  return flist.addBookmark(state.account, state.ticket, name)
  .then(() => {
    Vue.set(state.bookmarks, name, true)
  })
}

export function removeBookmark (name) {
  return flist.removeBookmark(state.account, state.ticket, name)
  .then(() => {
    Vue.delete(state.bookmarks, name)
  })
}

export function addIgnored (name) {
  Vue.set(state.ignored, name, true)
}

export function removeIgnored (name) {
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
