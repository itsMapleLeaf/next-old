import Vue from 'vue'
import Character from './models/Character'
import ChannelRoom from './models/ChannelRoom'
import PrivateRoom from './models/PrivateRoom'
import Message from './models/Message'
import * as flist from './f-list'
import * as util from './util'
import * as socket from './socket'
import parseBBC from './parse-bbc'
import meta from '../../package.json'

const socketStates = ['offline', 'connected', 'identified', 'online']

export const state = {
  // ui overlays
  overlays: [],

  // socket connection state
  // either: offline, connecting, online, identified
  socketState: 'offline',

  // auth information
  account: '',
  ticket: '',

  // our current identity
  identity: '',

  // our status
  status: 'online',
  statusmsg: '',

  // our list of characters
  characters: [],

  // a list of friendship entries: { you: yourCharacter, them: theirCharacter }
  friends: [],

  // our bookmarks by name
  bookmarks: [],

  // ignored characters by name
  ignored: [],

  // global admins by name
  admins: [],

  // a map of all online characters, name to Character object
  onlineCharacters: {},

  // list of available channels
  // format: { id: channelID, name: channelTitle, users: numberOfCharacters }
  channels: [],

  // list of all active rooms
  rooms: [],

  // index of the current active room
  currentRoomIndex: 0,

  // map of channel IDs to channel room objects
  channelRooms: {},

  // map of partner names to private room objects
  privateRooms: {},

  // current character opened on the character menu (character object)
  characterMenuFocus: null,

  // convenience getter for the current room
  get currentRoom () {
    const index = util.clamp(this.currentRoomIndex, 0, this.rooms.length - 1)
    return this.rooms[index]
  }
}

// ui stuff
export function pushOverlay (overlay) {
  state.overlays.push(overlay)
}

export function popOverlay () {
  state.overlays.pop()
}

// user data stuff
export function fetchUserData (account, ticket) {
  state.account = account
  state.ticket = ticket

  return Promise.all([
    flist.getCharacters(account, ticket),
    flist.getFriends(account, ticket),
    flist.getBookmarks(account, ticket)
  ])
  .then(data => {
    state.characters = data[0]
    state.friends = data[1]
    state.bookmarks = data[2]
  })
}

export function setIdentity (name) {
  state.identity = name
}

export function setStatus (status, message) {
  state.status = status
  state.statusmsg = message
}

// socket stuff
export function setSocketState (socketState) {
  if (!socketStates.includes(socketState)) {
    console.error('Invalid connection state: ', socketState)
  }
  state.socketState = socketState
}

export function connectToChatServer () {
  const ws = socket.connect()

  ws.onopen = () => {
    console.log('Socket opened')
    this.setSocketState('connected')
    this.identify()
  }

  ws.onclose = () => {
    console.log('Socket closed')
    this.setSocketState('offline')
  }

  ws.onerror = (err) => {
    console.error('Socket error:', err)
    this.setSocketState('offline')
  }

  ws.onmessage = (msg) => {
    const {data} = msg
    const command = data.substring(0, 3)
    const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}
    socket.handleCommand(command, params)
  }
}

export function disconnectFromChatServer () {
  socket.disconnect()
}

export function identify () {
  socket.sendCommand('IDN', {
    method: 'ticket',
    account: state.account,
    ticket: state.ticket,
    character: state.identity,
    cname: meta.name,
    cversion: meta.version
  })
}

export function requestChannels () {
  this.clearChannels()
  socket.sendCommand('CHA')
  socket.sendCommand('ORS')
}

export function joinChannel (channel) {
  socket.sendCommand('JCH', { channel })
}

export function leaveChannel (channel) {
  socket.sendCommand('LCH', { channel })
}

export function sendChannelMessage (channel, message) {
  socket.sendCommand('MSG', { channel, message })
}

export function sendPrivateMessage (recipient, message) {
  socket.sendCommand('PRI', { recipient, message })
}

export function updateStatus (status, statusmsg) {
  socket.sendCommand('STA', { status, statusmsg })
  this.setStatus(status, statusmsg)
}

export function ignoreAction (character, action) {
  // action can be: 'add', 'delete', 'notify', or 'list'
  // https://wiki.f-list.net/F-Chat_Client_Commands#IGN
  socket.sendCommand('IGN', { character, action })
}

// chat stuff
export function addCharacterBatch (batch) {
  const map = {}
  for (let info of batch) {
    const char = new Character(...info)
    map[char.name] = char
  }
  Object.assign(state.onlineCharacters, map)
}

export function addCharacter (name, gender) {
  state.onlineCharacters[name] = new Character(name, gender)
}

export function removeCharacter (name) {
  const char = state.onlineCharacters[name]
  for (let room of util.values(state.channelRooms)) {
    util.remove(room.characters, char)
  }
  delete state.onlineCharacters[name]
}

export function setCharacterStatus (name, status, message) {
  const char = state.onlineCharacters[name]
  char.setStatus(status, message)
}

export function setIgnoreList (list) {
  state.ignored = list
}

export function setAdminList (list) {
  state.admins = list
}

export function addChannels (list) {
  state.channels = state.channels.concat(list)
}

export function clearChannels () {
  state.channels = []
}

export function addChannelChat (id, name) {
  const room = new ChannelRoom(id, name)
  Vue.set(state.channelRooms, id, room)
  state.rooms.push(room)
}

export function removeChannelChat (id) {
  const room = state.channelRooms[id]
  Vue.delete(state.channelRooms, id)
  util.remove(state.rooms, room)
}

export function isChannelJoined (id) {
  return state.channelRooms[id] != null
}

export function setChannelCharacters (id, names) {
  const room = state.channelRooms[id]
  room.setCharacters(names.map(name => state.onlineCharacters[name]))
}

export function addChannelCharacter (id, name) {
  const room = state.channelRooms[id]
  room.addCharacter(state.onlineCharacters[name])
}

export function removeChannelCharacter (id, name) {
  const room = state.channelRooms[id]
  room.removeCharacter(state.onlineCharacters[name])
}

export function setChannelOps (id, ops) {
  state.channelRooms[id].ops = ops
}

export function setChannelMode (id, mode) {
  state.channelRooms[id].mode = mode
}

export function setChannelDescription (id, description) {
  state.channelRooms[id].description = parseBBC(description)
}

export function addChannelMessage (id, name, message, type) {
  const channel = state.channelRooms[id]
  const sender = state.onlineCharacters[name]
  channel.messages.push(new Message(sender, message, type))
}

export function addPrivateRoom (partnerName) {
  const partner = state.onlineCharacters[partnerName]
  const room = new PrivateRoom(partner)
  state.rooms.push(room)
  state.privateRooms[partnerName] = room
  return room
}

export function removePrivateRoom (partnerName) {
  const room = state.privateRooms[partnerName]
  delete state.privateRooms[partnerName]
  util.remove(state.rooms, room)
}

export function addPrivateMessage (partnerName, senderName, message, type) {
  const room = state.privateRooms[partnerName] || this.addPrivateRoom(partnerName)
  const sender = state.onlineCharacters[senderName]
  room.messages.push(new Message(sender, message, type))
}

export function setCharacterMenuFocus (name) {
  state.characterMenuFocus = state.onlineCharacters[name]
}

export function openCharacterMenu (name) {
  this.setCharacterMenuFocus(name)
  this.pushOverlay('character-menu')
}

export function addBookmark (name) {
  return flist.addBookmark(state.account, state.ticket, name)
  .then(() => {
    state.bookmarks.push(name)
  })
}

export function removeBookmark (name) {
  return flist.removeBookmark(state.account, state.ticket, name)
  .then(() => {
    util.remove(state.bookmarks, name)
  })
}

export function addIgnored (name) {
  state.ignored.push(name)
}

export function removeIgnored (name) {
  util.remove(state.ignored, name)
}

export function setCurrentRoom (room) {
  const index = state.rooms.indexOf(room)
  if (index > -1) {
    state.currentRoomIndex = index
  }
}
