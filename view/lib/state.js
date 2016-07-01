import Vue from 'vue'
import {keys} from './storage'
import * as flist from '../lib/flist'

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
      userData: {
        account: '',
        character: '',
        bookmarks: [],
        characters: [],
        default_character: '',
        ticket: ''
      },

      friends: {},          // userCharacter (string) => friendName (string)
      publicChannels: [],   // ChannelInfo[]
      privateChannels: [],  // ChannelInfo[]
      channels: {},         // channelID (string) => ChannelState
      privateChats: {},     // characterName (string) => PrivateChatState
      serverVariables: {},  // variableName (string) => number
      onlineCharacters: {}, // characterName (string) => Character
      ignored: [],          // string[]
      admins: []            // string[]
    }

    const account = window.localStorage.getItem(keys.account())
    if (account) {
      const ticket = window.localStorage.getItem(keys.ticket(account))
      if (ticket) {
        Object.assign(this.data.userData, { account, ticket })
      }
      const character = window.localStorage.getItem(keys.character(account))
      if (character) {
        this.data.userData.default_character = character
      }
    }
  }

  // getters
  getUserData () {
    return Object.assign({}, this.data.userData)
  }

  getChannel (id) {
    let channel = this.data.channels[id]
    if (!channel) {
      const {publicChannels, privateChannels} = this.data
      const name = publicChannels.concat(privateChannels).find(ch => ch.id === id).name
      channel = Vue.set(this.data.channels, id, ChannelState(id, name))
    }
    return channel
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
    return this.data.userData.character
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

  // return the user character that another character is friends with
  // if not friends, returns undefined
  getFriendship (name) {
    return this.data.friends[name] || []
  }

  isBookmarked (name) {
    return this.data.userData.bookmarks.includes(name)
  }

  isIgnored (name) {
    return this.data.ignored.includes(name)
  }

  isAdmin (name) {
    return this.data.admins.includes(name)
  }

  isChannelOp (name, channel) {}

  // setters
  setAccount (account) {
    this.data.userData.account = account
    window.localStorage.setItem(keys.account(), account)
  }

  setTicket (ticket) {
    this.data.userData.ticket = ticket
    window.localStorage.setItem(keys.ticket(this.data.userData.account), ticket)
  }

  setUserCharacter (charname) {
    this.data.userData.character = charname
    window.localStorage.setItem(keys.character(this.data.userData.account), charname)
  }

  setUserCharacterList (characters) {
    this.data.userData.characters = characters
  }

  setFriendsList (friends) {
    console.log(friends)
    for (let entry of friends) {
      // i love inconsistent APIs
      const friend = entry.dest || entry.source_name
      const userCharacter = entry.source || entry.dest_name
      this.data.friends[friend] = (this.data.friends[friend] || []).concat([userCharacter])
    }
  }

  setBookmarkList (bookmarks) {
    this.data.userData.bookmarks = bookmarks
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
    delete this.data.onlineCharacters[name]
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
    const {account, ticket, bookmarks} = this.data.userData
    flist.addBookmark(account, ticket, name)
    .then(() => {
      bookmarks.push(name)
    })
  }

  removeBookmark (name) {
    const {account, ticket, bookmarks} = this.data.userData
    flist.addBookmark(account, ticket, name)
    .then(() => {
      bookmarks.$remove(name)
    })
  }
}

export default new State()
