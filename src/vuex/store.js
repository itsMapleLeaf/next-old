import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  account: '',
  loginData: {},
  loginStatusMessage: '',

  publicChannels: [],
  privateChannels: [],
  joinedChannels: [],
  currentChannelIndex: 0,

  socket: null,
  serverVariables: {},

  character: '',
  onlineCharacters: {},
  ignored: [],
  admins: [],

  currentOverlay: 'login'
}

const compareChannels = (a, b) => (a.title || a.name).localeCompare(b.title || b.name)

const mutations = {
  SET_OVERLAY (state, overlay) {
    state.currentOverlay = overlay
  },

  LOGIN_REQUEST (state, account) {
    state.account = account
    state.loginStatusMessage = 'Hold on...'
  },

  LOGIN_SUCCESS (state, data) {
    state.loginData = data
    state.loginStatusMessage = 'Success!'
  },

  LOGIN_FAILURE (state, err) {
    state.loginStatusMessage = err
  },

  CHOOSE_CHARACTER (state, char) {
    state.character = char
  },

  CONNECT_REQUEST (state) {},

  SOCKET_ERROR (state, err) {
    state.loginStatusMessage = err
  },

  CHAT_IDENTIFY_REQUEST (state) {},

  CHAT_IDENTIFY_SUCCESS (state, socket) {
    state.socket = socket
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
      state.onlineCharacters[name] = { gender, status, statusMessage }
    }
  },

  ADD_CHARACTER (state, name, info) {
    state.onlineCharacters[name] = Object.assign({}, info)
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
    state.publicChannels = channels.slice().sort(compareChannels)
  },

  SET_PRIVATE_CHANNEL_LIST (state, channels) {
    state.privateChannels = channels.slice().sort(compareChannels)
  },

  CHANNEL_JOIN_REQUEST (state, id, name = id) {
    state.joinedChannels.push({
      id, name,
      status: 'joining',
      mode: 'both',
      characters: [],
      messages: []
    })
    state.socket.joinChannel(id)
  },

  CHANNEL_JOIN_SUCCESS (state, id, namelist, mode) {
    const channel = state.joinedChannels.find(ch => ch.id === id)
    const characters = namelist.map(name => state.onlineCharacters[name])
    channel.mode = mode
    channel.characters = characters
  }
}

export default new Vuex.Store({ state, mutations })
