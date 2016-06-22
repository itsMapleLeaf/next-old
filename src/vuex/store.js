import Vue from 'vue'
import Vuex from 'vuex'
import {Character, ChannelState, ChatMessage, PrivateChatState} from '../models'

Vue.use(Vuex)

const state = {
  userData: {
    account: '',
    character: '',
    bookmarks: [],
    characters: [],
    default_character: '',
    friends: [],
    ticket: ''
  },

  publicChannels: [],   // ChannelInfo[]
  privateChannels: [],  // ChannelInfo[]
  channels: {},         // channelID (string) => ChannelState
  privateMessages: {},  // characterName (string) => PMState
  serverVariables: {},  // variableName (string) => any
  onlineCharacters: {}, // characterName (string) => Character
  ignored: [],          // string[]
  admins: []            // string[]
}

const mutations = {
  LOGIN_REQUEST (state, account) {
    state.userData.account = account
  },

  LOGIN_SUCCESS (state, loginData) {
    Object.assign(state.userData, loginData)
  },

  CHARACTER_SELECTED (state, char) {
    state.userData.character = char
  },

  SET_SERVER_VARIABLE (state, key, value) {
    state.serverVariables[key] = value
  },

  SET_IGNORE_LIST (state, ignoreList) {
    state.ignored = ignoreList
  },

  SET_ADMIN_LIST (state, adminList) {
    state.admins = adminList
  },

  HASH_CHARACTERS (state, characterInfoList) {
    for (let [name, gender, status, statusMessage] of characterInfoList) {
      state.onlineCharacters[name] = Character(name, gender, status, statusMessage)
    }
  },

  ADD_CHARACTER (state, name, gender) {
    state.onlineCharacters[name] = Character(name, gender)
  },

  REMOVE_CHARACTER (state, name) {
    delete state.onlineCharacters[name]
  },

  SET_CHARACTER_STATUS (state, name, status, statusMessage) {
    const char = state.onlineCharacters[name]
    if (char) {
      char.status = status
      char.statusMessage = statusMessage
    }
  },

  SET_PUBLIC_CHANNEL_LIST (state, channels) {
    state.publicChannels = channels.slice()
  },

  SET_PRIVATE_CHANNEL_LIST (state, channels) {
    state.privateChannels = channels.slice()
  },

  CREATE_CHANNEL_STATE (state, id, name) {
    if (!state.channels[id]) {
      Vue.set(state.channels, id, ChannelState(id, name))
    }
  },

  JOIN_CHANNEL_REQUEST (state, id) {
    state.channels[id].status = 'joining'
  },

  LEAVE_CHANNEL_REQUEST (state, id) {
    state.channels[id].status = 'leaving'
  },

  CHANNEL_INIT (state, id, namelist, mode) {
    const channel = state.channels[id]
    const characters = []

    for (let name of namelist) {
      const char = state.onlineCharacters[name]
      if (char) {
        characters.push(char)
      }
    }

    channel.mode = mode
    channel.characters = characters
    channel.status = 'joined'
  },

  SET_CHANNEL_DESCRIPTION (state, id, description) {
    const channel = state.channels[id]
    channel.description = description
  },

  CHANNEL_JOIN (state, id, charname) {
    const channel = state.channels[id]
    const char = state.onlineCharacters[charname]
    if (char) {
      channel.characters.push(char)
    }
  },

  CHANNEL_LEAVE (state, id, charname) {
    if (charname === state.userData.character) {
      state.channels[id].status = 'left'
    } else {
      const channel = state.channels[id]
      channel.characters = channel.characters.filter(c => c.name !== charname)
    }
  },

  RECEIVED_CHANNEL_MESSAGE (state, id, charName, message) {
    const channel = state.channels[id]
    const char = state.onlineCharacters[charName]
    channel.messages.push(ChatMessage(char, message))
  },

  // SEND_CHANNEL_MESSAGE (state, message) {
  //   const channel = state.joinedChannels[state.selectedChannelIndex]
  //   const msgModel = ChatMessage(state.onlineCharacters[state.character], message)
  //   channel.messages.push(msgModel)
  // },

  RECEIVED_PRIVATE_MESSAGE (state, charname, message) {
    const character = state.onlineCharacters[charname]
    let pmstate = state.privateMessages[charname]
    if (!pmstate) {
      pmstate = Vue.set(state.privateMessages, charname, PrivateChatState(character))
    }
    pmstate.messages.push(ChatMessage(character, message))
  },

  SENT_PRIVATE_MESSAGE (state, recipient, message) {
    const character = state.onlineCharacters[recipient]
    let pmstate = state.privateMessages[recipient]
    if (!pmstate) {
      pmstate = Vue.set(state.privateMessages, recipient, PrivateChatState(character))
    }
    pmstate.messages.push(ChatMessage(state.onlineCharacters[state.userData.character], message))
  }
}

export default new Vuex.Store({ state, mutations })
