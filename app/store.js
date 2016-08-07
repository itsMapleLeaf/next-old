import Vue from 'vue'
import Character from './models/Character'
import ChannelRoom from './models/ChannelRoom'
import PrivateRoom from './models/PrivateRoom'
import Message from './models/Message'
import * as flist from './f-list'
import * as util from './util'
import parseBBC from './parse-bbc'
import socket from './socket'
import meta from '../package.json'

const socketStates = ['offline', 'connected', 'identified', 'online']

const store = {
  state: {
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
  },

  // ui stuff
  pushOverlay (overlay) {
    this.state.overlays.push(overlay)
  },

  popOverlay () {
    this.state.overlays.pop()
  },

  // user data stuff
  fetchUserData (account, ticket) {
    this.state.account = account
    this.state.ticket = ticket

    return Promise.all([
      flist.getCharacters(account, ticket),
      flist.getFriends(account, ticket),
      flist.getBookmarks(account, ticket)
    ])
    .then(data => {
      this.state.characters = data[0]
      this.state.friends = data[1]
      this.state.bookmarks = data[2]
    })
  },

  setIdentity (name) {
    this.state.identity = name
  },

  setStatus (status, message) {
    this.state.status = status
    this.state.statusmsg = message
  },

  // socket stuff
  setSocketState (socketState) {
    if (!socketStates.includes(socketState)) {
      console.error('Invalid connection state: ', socketState)
    }
    this.state.socketState = socketState
  },

  connectToChatServer () {
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
  },

  identify () {
    socket.sendCommand('IDN', {
      method: 'ticket',
      account: this.state.account,
      ticket: this.state.ticket,
      character: this.state.identity,
      cname: meta.name,
      cversion: meta.version
    })
  },

  requestChannels () {
    this.clearChannels()
    socket.sendCommand('CHA')
    socket.sendCommand('ORS')
  },

  joinChannel (channel) {
    socket.sendCommand('JCH', { channel })
  },

  leaveChannel (channel) {
    socket.sendCommand('LCH', { channel })
  },

  sendChannelMessage (channel, message) {
    socket.sendCommand('MSG', { channel, message })
  },

  sendPrivateMessage (recipient, message) {
    socket.sendCommand('PRI', { recipient, message })
  },

  updateStatus (status, statusmsg) {
    socket.sendCommand('STA', { status, statusmsg })
    this.setStatus(status, statusmsg)
  },

  ignoreAction (character, action) {
    // action can be: 'add', 'delete', 'notify', or 'list'
    // https://wiki.f-list.net/F-Chat_Client_Commands#IGN
    socket.sendCommand('IGN', { character, action })
  },

  // chat stuff
  addCharacterBatch (batch) {
    const map = {}
    for (let info of batch) {
      const char = new Character(...info)
      map[char.name] = char
    }
    Object.assign(this.state.onlineCharacters, map)
  },

  addCharacter (name, gender) {
    this.state.onlineCharacters[name] = new Character(name, gender)
  },

  removeCharacter (name) {
    const char = this.state.onlineCharacters[name]
    for (let room of util.values(this.state.channelRooms)) {
      util.remove(room.characters, char)
    }
    delete this.state.onlineCharacters[name]
  },

  setCharacterStatus (name, status, message) {
    const char = this.state.onlineCharacters[name]
    char.setStatus(status, message)
  },

  setIgnoreList (list) {
    this.state.ignored = list
  },

  setAdminList (list) {
    this.state.admins = list
  },

  addChannels (list) {
    this.state.channels = this.state.channels.concat(list)
  },

  clearChannels () {
    this.state.channels = []
  },

  addChannelChat (id, name) {
    const room = new ChannelRoom(id, name)
    Vue.set(this.state.channelRooms, id, room)
    this.state.rooms.push(room)
  },

  removeChannelChat (id) {
    const room = this.state.channelRooms[id]
    Vue.delete(this.state.channelRooms, id)
    util.remove(this.state.rooms, room)
  },

  isChannelJoined (id) {
    return this.state.channelRooms[id] != null
  },

  setChannelCharacters (id, names) {
    const room = this.state.channelRooms[id]
    room.setCharacters(names.map(name => this.state.onlineCharacters[name]))
  },

  addChannelCharacter (id, name) {
    const room = this.state.channelRooms[id]
    room.addCharacter(this.state.onlineCharacters[name])
  },

  removeChannelCharacter (id, name) {
    const room = this.state.channelRooms[id]
    room.removeCharacter(this.state.onlineCharacters[name])
  },

  setChannelOps (id, ops) {
    this.state.channelRooms[id].ops = ops
  },

  setChannelMode (id, mode) {
    this.state.channelRooms[id].mode = mode
  },

  setChannelDescription (id, description) {
    this.state.channelRooms[id].description = parseBBC(description)
  },

  addChannelMessage (id, name, message, type) {
    const channel = this.state.channelRooms[id]
    const sender = this.state.onlineCharacters[name]
    channel.messages.push(new Message(sender, message, type))
  },

  addPrivateRoom (partnerName) {
    const partner = this.state.onlineCharacters[partnerName]
    const room = new PrivateRoom(partner)
    this.state.rooms.push(room)
    this.state.privateRooms[partnerName] = room
    return room
  },

  removePrivateRoom (partnerName) {
    const room = this.state.privateRooms[partnerName]
    delete this.state.privateRooms[partnerName]
    util.remove(this.state.rooms, room)
  },

  addPrivateMessage (partnerName, senderName, message, type) {
    const room = this.state.privateRooms[partnerName] || this.addPrivateRoom(partnerName)
    const sender = this.state.onlineCharacters[senderName]
    room.messages.push(new Message(sender, message, type))
  },

  setCharacterMenuFocus (name) {
    this.state.characterMenuFocus = this.state.onlineCharacters[name]
  },

  openCharacterMenu (name) {
    this.setCharacterMenuFocus(name)
    this.pushOverlay('character-menu')
  },

  addBookmark (name) {
    return flist.addBookmark(this.state.account, this.state.ticket, name)
    .then(() => {
      this.state.bookmarks.push(name)
    })
  },

  removeBookmark (name) {
    return flist.removeBookmark(this.state.account, this.state.ticket, name)
    .then(() => {
      util.remove(this.state.bookmarks, name)
    })
  },

  addIgnored (name) {
    this.state.ignored.push(name)
  },

  removeIgnored (name) {
    util.remove(this.state.ignored, name)
  },

  setCurrentRoom (room) {
    const index = this.state.rooms.indexOf(room)
    if (index > -1) {
      this.state.currentRoomIndex = index
    }
  }
}

const state = store.state

export { store, state }
