import Vue from 'vue'
import storage from './storage'
import * as flist from '../lib/flist'
// import {compareNames} from '../lib/util'

import {
  Character,
  ChannelState,
  ChannelStatus,
  ChatMessage,
  PrivateChatState
} from './types'

class State {
  constructor () {
    this.data = {
      account: '',          // string
      ticket: '',           // string
      character: '',        // string
      characterList: [],    // string[]
      bookmarks: [],        // string[]
      ignored: [],          // string[]
      friends: {},          // userCharacter (string) => friendName (string)
      publicChannels: [],   // ChannelInfo[]
      privateChannels: [],  // ChannelInfo[]
      channels: {},         // channelID (string) => ChannelState
      privateChats: {},     // characterName (string) => PrivateChatState
      serverVariables: {},  // variableName (string) => number
      onlineCharacters: {}, // characterName (string) => Character
      admins: []            // string[]
    }
  }

  loadStorageData () {
    return storage.getAccount().then(account => {
      this.data.account = account
      return storage.getTicket(this.data.account)
    })
    .then(ticket => {
      this.data.ticket = ticket
      return storage.getCharacter(this.data.account)
    })
    .then(character => {
      this.data.character = character
      return Promise.resolve()
    })
    .catch(msg => {
      console.log(msg)
      return Promise.reject()
    })
  }

  // getters
  getAccount () {
    return this.data.account
  }

  getTicket () {
    return this.data.ticket
  }

  getUserCharacterList () {
    return this.data.characterList.slice()
  }

  getAuthData () {
    return { account: this.getAccount(), ticket: this.getTicket() }
  }

  getChannel (id) {
    return this.data.channels[id] || this.createChannelState(id)
  }

  getPrivateChat (partner) {
    let chat = this.data.privateChats[partner]
    if (!chat) {
      const character = this.data.onlineCharacters[partner]
      chat = Vue.set(this.data.privateChats, partner, PrivateChatState(character))
    }
    return chat
  }

  getUserCharacter () {
    return this.data.onlineCharacters[this.getUserCharacterName()]
  }

  getUserCharacterName () {
    return this.data.character
  }

  getChannelStatus (id) {
    if (!this.data.channels[id]) {
      return ChannelStatus.left
    }
    return this.data.channels[id].status
  }

  getPublicChannelList () {
    return this.data.publicChannels.slice()
  }

  getPrivateChannelList () {
    return this.data.privateChannels.slice()
  }

  getUserChannels () {
    return this.data.channels.slice()
  }

  getCharacter (name) {
    return this.data.onlineCharacters[name]
  }

  // returns an array of every online character
  getOnlineCharacters () {
    const {onlineCharacters} = this.data
    return Object.keys(onlineCharacters).map(name => onlineCharacters[name])
  }

  // return the user character that another character is friends with
  // if not friends, returns undefined
  getFriendship (name) {
    return this.data.friends[name] || []
  }

  isBookmarked (name) {
    return this.data.bookmarks.includes(name)
  }

  isIgnored (name) {
    return this.data.ignored.includes(name)
  }

  isAdmin (name) {
    return this.data.admins.includes(name)
  }

  isChannelOp (name, channel) {}

  // returns a classification for a character
  // useful for list sorting by friends, bookmarks, etc.
  getCharacterCategory (character) {
    const cat = []
    if (this.getFriendship(character.name).length > 0) {
      cat.push('friend')
    }
    if (this.isBookmarked(character.name)) {
      cat.push('bookmark')
    }
    if (this.isAdmin(character.name)) {
      cat.push('admin')
    }
    if (this.isIgnored(character.name)) {
      cat.push('ignored')
    }
    if (character.status === 'looking') {
      cat.push('looking')
    }
    return cat
  }

  // setters
  setAccount (account) {
    this.data.account = account
    storage.setAccount(account)
  }

  setTicket (ticket) {
    this.data.ticket = ticket
    storage.setTicket(this.data.account, ticket)
  }

  setUserCharacter (charname) {
    this.data.character = charname
    storage.setCharacter(this.data.account, charname)
  }

  setUserCharacterList (list) {
    this.data.characterList = list
  }

  setFriendsList (friends) {
    for (let entry of friends) {
      // i love inconsistent APIs
      const friend = entry.dest || entry.source_name
      const userCharacter = entry.source || entry.dest_name
      this.data.friends[friend] = (this.data.friends[friend] || []).concat([userCharacter])
    }
  }

  setBookmarkList (bookmarks) {
    this.data.bookmarks = bookmarks
  }

  setIgnoreList (names) {
    this.data.ignored = names
  }

  setAdminList (names) {
    this.data.admins = names
  }

  setServerVariable (key, value) {
    Vue.set(this.data.serverVariables, key, value)
  }

  hashCharacters (chars) {
    const hash = {}
    for (let [name, gender, status, statusMessage] of chars) {
      hash[name] = Character(name, gender, status, statusMessage)
    }
    Object.assign(this.data.onlineCharacters, hash)
  }

  addCharacter (name, gender) {
    Vue.set(this.data.onlineCharacters, name, Character(name, gender))
  }

  removeCharacter (name) {
    const {onlineCharacters, channels} = this.data
    delete onlineCharacters[name]
    for (let id in channels) {
      const channel = channels[id]
      channel.characters = channel.characters.filter(char => char.name !== name)
    }
  }

  setCharacterStatus (name, status, statusMessage) {
    const char = this.data.onlineCharacters[name]
    if (char) {
      char.status = status
      char.statusMessage = statusMessage
    }
  }

  setPublicChannelList (channels) {
    this.data.publicChannels = channels
  }

  setPrivateChannelList (channels) {
    this.data.privateChannels = channels
  }

  createChannelState (id) {
    // lazy hacks are lazy
    const {publicChannels, privateChannels} = this.data
    const info = publicChannels.concat(privateChannels).find(ch => ch.id === id)
    if (info) {
      return Vue.set(this.data.channels, id, ChannelState(info.type, info.id, info.name))
    }
  }

  setChannelName (id, name) {
    this.getChannel(id).name = name
  }

  setChannelStatus (id, status) {
    this.getChannel(id).status = status
  }

  setChannelMode (id, mode) {
    this.getChannel(id).mode = mode
  }

  setChannelCharacters (id, names) {
    const characters = []
    for (let name of names) {
      const char = this.data.onlineCharacters[name]
      if (char) {
        characters.push(char)
      }
    }

    this.getChannel(id).characters = characters
  }

  setChannelDescription (id, description) {
    this.getChannel(id).description = description
  }

  addChannelCharacter (id, name) {
    const channel = this.getChannel(id)
    const char = this.data.onlineCharacters[name]
    if (char) {
      channel.characters.push(char)
    }
  }

  removeChannelCharacter (id, name) {
    const channel = this.getChannel(id)
    channel.characters = channel.characters.filter(char => char.name !== name)
  }

  addChannelMessage (id, name, message) {
    const channel = this.getChannel(id)
    const char = this.data.onlineCharacters[name]
    if (char) {
      channel.messages.push(ChatMessage(char, message))
    }
  }

  addPrivateMessage (partner, name, message) {
    const chat = this.getPrivateChat(partner)
    const character = this.data.onlineCharacters[name]
    if (character) {
      chat.messages.push(ChatMessage(character, message))
    }
  }

  addBookmark (name) {
    const {account, ticket, bookmarks} = this.data
    flist.addBookmark(account, ticket, name)
    .then(() => {
      bookmarks.push(name)
    })
  }

  removeBookmark (name) {
    const {account, ticket, bookmarks} = this.data
    flist.removeBookmark(account, ticket, name)
    .then(() => {
      bookmarks.$remove(name)
    })
  }
}

export default new State()
