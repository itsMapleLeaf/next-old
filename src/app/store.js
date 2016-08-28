import Vue from 'vue'
import Character from './models/Character'
import ChannelRoom from './models/ChannelRoom'
import PrivateRoom from './models/PrivateRoom'
import * as flist from './f-list'
import * as util from './util'
import * as socket from './socket'
import parseBBC from './parse-bbc'
import meta from '../../package.json'
import {Howl} from 'howler'

const socketStates = ['offline', 'connected', 'identified', 'online']

const notificationSound = new Howl({
  src: ['assets/notify.mp3', 'assets/notify.ogg'],
  volume: 0.5
})

export const state = {
  // ui overlays
  overlays: [],

  // user notifications
  notifications: [],

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

  // a map of characters to friends they're with { "their character": ["your character 1", "your character 2"] }
  friends: {},

  // our bookmarks by name
  bookmarks: {},

  // ignored characters by name
  ignored: {},

  // global admins by name
  admins: {},

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
  },

  // convenience getter for the user's character object
  get userCharacter () {
    return this.onlineCharacters[this.identity]
  }
}

// ui stuff
export function pushOverlay (overlay) {
  state.overlays.push(overlay)
}

export function popOverlay () {
  state.overlays.pop()
}

export function addNotification (text, lifetime = 2000, activate = () => {}) {
  const note = {
    text,
    created: Date.now(),
    lifetime,
    visible: true,
    activate
  }
  state.notifications.push(note)
  if (lifetime != null) {
    window.setTimeout(() => { note.visible = false }, lifetime)
  }
}

export function addAudioNotification (...args) {
  addNotification(...args)
  notificationSound.stop().play()
}

export function removeNotification (note) {
  util.remove(state.notifications, note)
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
    state.friends = util.mapToObject(data[1], name => [name, true])
    state.bookmarks = util.mapToObject(data[2], name => [name, true])
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
  if (socket.isConnected()) return

  const ws = socket.connect()

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
  clearChannels()
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
  .setStatus(status, statusmsg)
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
  state.ignored = util.mapToObject(list, name => [name, true])
}

export function setAdminList (list) {
  state.admins = util.mapToObject(list, name => [name, true])
}

export function addChannels (list) {
  state.channels = state.channels.concat(list)
}

export function clearChannels () {
  state.channels = []
}

export function addChannelRoom (id, name) {
  const room = new ChannelRoom(id, name)
  Vue.set(state.channelRooms, id, room)
  state.rooms.push(room)
}

export function removeChannelRoom (id) {
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
  channel.addMessage(sender, message, type)
  if (name !== state.identity && channel !== state.currentRoom) {
    channel.active = true
  }
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
  const room = state.privateRooms[partnerName] || addPrivateRoom(partnerName)
  const sender = state.onlineCharacters[senderName]
  room.addMessage(sender, message, type)
  if (senderName !== state.identity && room !== state.currentRoom) {
    room.active = true
  }
}

export function setCharacterMenuFocus (name) {
  state.characterMenuFocus = state.onlineCharacters[name]
}

export function openCharacterMenu (name) {
  setCharacterMenuFocus(name)
  pushOverlay('character-menu')
}

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

export function setCurrentRoom (room) {
  const index = state.rooms.indexOf(room)
  if (index > -1) {
    state.currentRoomIndex = index
  }
}

export function setPrivateRoom (partnerName) {
  const index = state.rooms.findIndex(room => room.partner && room.partner.name === partnerName)
  if (index > -1) {
    state.currentRoomIndex = index
  }
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
