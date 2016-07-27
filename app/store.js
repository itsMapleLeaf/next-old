import Vue from 'vue'
import Character from './models/Character'
import ChannelRoom from './models/ChannelRoom'
import * as flist from './f-list'

export default {
  // ui overlays
  overlays: [],

  // auth information
  account: '',
  ticket: '',

  // our current identity
  identity: '',

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

  // map of active channel IDs to the channel chat
  channelRooms: {},

  pushOverlay (overlay) {
    this.overlays.push(overlay)
  },

  popOverlay () {
    this.overlays.pop()
  },

  fetchUserData (account, ticket) {
    this.account = account
    this.ticket = ticket

    return Promise.all([
      flist.getCharacters(account, ticket),
      flist.getFriends(account, ticket),
      flist.getBookmarks(account, ticket)
    ])
    .then(data => {
      this.characters = data[0]
      this.friends = data[1]
      this.bookmarks = data[2]
    })
  },

  setIdentity (name) {
    this.identity = name
  },

  addCharacterBatch (batch) {
    const map = {}
    for (let info of batch) {
      const char = new Character(...info)
      map[char.name] = char
    }
    Object.assign(this.onlineCharacters, map)
  },

  addCharacter (name, gender) {
    this.onlineCharacters[name] = new Character(name, gender)
  },

  removeCharacter (name) {
    delete this.onlineCharacters[name]
  },

  setCharacterStatus (name, status, message) {
    const char = this.onlineCharacters[name]
    char.status = status
    char.statusmsg = message
  },

  setIgnoreList (list) {
    this.ignored = list
  },

  setAdminList (list) {
    this.admins = list
  },

  addChannels (list) {
    this.channels = this.channels.concat(list)
  },

  clearChannels () {
    this.channels = []
  },

  addChannelChat (id, name) {
    const room = new ChannelRoom(id, name)
    Vue.set(this.channelRooms, id, room)
    this.rooms.push(room)
  },

  removeChannelChat (id) {
    this.rooms.splice(this.rooms.findIndex(ch => ch === this.channelRooms[id]), 1)
    Vue.delete(this.channelRooms, id)
  },

  isChannelJoined (id) {
    return this.channelRooms[id] != null
  },

  addChannelCharacter (id, name) {
    const chat = this.channelRooms[id]
    chat.characters.push(this.onlineCharacters[name])
  },

  removeChannelCharacter (id, name) {
    const chat = this.channelRooms[id]
    const index = chat.characters.findIndex(char => char.name === name)
    chat.characters.splice(index, 1)
  },

  setChannelOps (id, ops) {
    this.channelRooms[id].ops = ops
  },

  setChannelCharacters (id, names) {
    this.channelRooms[id].characters = names.map(name => this.onlineCharacters[name])
  },

  setChannelMode (id, mode) {
    this.channelRooms[id].mode = mode
  },

  setChannelDescription (id, description) {
    this.channelRooms[id].description = description
  },

  addChannelMessage (id, name, message) {
    const channel = this.channelRooms[id]
    const sender = this.onlineCharacters[name]
    channel.messages.push({ sender, message })
  },

  getCurrentRoom () {
    return this.rooms[this.currentRoomIndex]
  },

  setCurrentRoom (room) {
    const index = this.rooms.indexOf(room)
    if (index > -1) {
      this.currentRoomIndex = index
    }
  }
}
