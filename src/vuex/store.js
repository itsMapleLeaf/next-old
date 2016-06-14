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
  serverVariables: {},

  character: '',
  onlineCharacters: {},
  ignored: [],
  admins: [],

  currentOverlay: 'login'
}

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

  CHAT_IDENTIFY_SUCCESS (state) {},

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
    char.status = status
    char.statusMessage = statusMessage
  },

  SET_PUBLIC_CHANNEL_LIST (state, channels) {
    state.publicChannels = channels
  },

  SET_PRIVATE_CHANNEL_LIST (state, channels) {
    state.privateChannels = channels
  }
}

export default new Vuex.Store({ state, mutations })
