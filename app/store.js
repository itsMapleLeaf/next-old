import Vue from 'vue'
import Character from './models/Character'
import * as flist from './f-list'

export default {
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

  // ui overlays
  overlays: [],

  // a map of all online characters, name to Character object
  onlineCharacters: {},

  // list of available channels
  // format: { id: channelID, name: channelTitle, users: numberOfCharacters }
  channels: [],

  // list of all active chats
  chats: [],

  // map of active channel IDs to the channel chat
  channelChats: {},

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
    const state = {
      id, name,
      type: 'channel',
      description: '',
      mode: 'both',
      characters: [],
      messages: [],
      ops: []
    }

    Vue.set(this.channelChats, id, state)
    this.chats.push(state)
  },

  removeChannelChat (id) {
    this.chats.splice(this.chats.findIndex(ch => ch === this.channelChats[id]), 1)
    Vue.delete(this.channelChats, id)
  },

  isChannelJoined (id) {
    return this.channelChats[id] != null
  },

  addChannelCharacter (id, name) {
    const chat = this.channelChats[id]
    chat.characters.push(this.onlineCharacters[name])
  },

  removeChannelCharacter (id, name) {
    const chat = this.channelChats[id]
    const index = chat.characters.findIndex(char => char.name === name)
    chat.characters.splice(index, 1)
  },

  setChannelOps (id, ops) {
    this.channelChats[id].ops = ops
  },

  setChannelCharacters (id, names) {
    this.channelChats[id].characters = names.map(name => this.onlineCharacters[name])
  },

  setChannelMode (id, mode) {
    this.channelChats[id].mode = mode
  },

  setChannelDescription (id, description) {
    this.channelChats[id].description = description
  }
}
