import Vue from 'vue'
import Character from './models/Character'
import ChannelRoom from './models/ChannelRoom'
import * as flist from './f-list'
import parseBBC from './parse-bbc'

export default {
  // ui overlays
  overlays: [],

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

  // map of active channel IDs to the channel chat
  channelRooms: {},

  // current character opened on the character menu (character object)
  characterMenuFocus: null,

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

  setStatus (status, message) {
    this.status = status
    this.statusmsg = message
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
    char.setStatus(status, message)
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

  setChannelCharacters (id, names) {
    const room = this.channelRooms[id]
    room.setCharacters(names.map(name => this.onlineCharacters[name]))
  },

  addChannelCharacter (id, name) {
    const room = this.channelRooms[id]
    room.addCharacter(this.onlineCharacters[name])
  },

  removeChannelCharacter (id, name) {
    const room = this.channelRooms[id]
    room.removeCharacter(this.onlineCharacters[name])
  },

  setChannelOps (id, ops) {
    this.channelRooms[id].ops = ops
  },

  setChannelMode (id, mode) {
    this.channelRooms[id].mode = mode
  },

  setChannelDescription (id, description) {
    this.channelRooms[id].description = parseBBC(description)
  },

  addChannelMessage (id, name, message) {
    const channel = this.channelRooms[id]
    const sender = this.onlineCharacters[name]
    channel.messages.push({ sender, message: parseBBC(message) })
  },

  getCurrentRoom () {
    return this.rooms[this.currentRoomIndex]
  },

  setCurrentRoom (room) {
    const index = this.rooms.indexOf(room)
    if (index > -1) {
      this.currentRoomIndex = index
    }
  },

  setCharacterMenuFocus (name) {
    this.characterMenuFocus = this.onlineCharacters[name]
  },

  openCharacterMenu (name) {
    this.setCharacterMenuFocus(name)
    this.pushOverlay('character-menu')
  }
}
