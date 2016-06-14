import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  account: '',
  loginData: {},
  loginStatusMessage: '',

  socket: null,
  serverVariables: {},

  channelList: [],
  joinedChannels: [],

  character: '',
  onlineCharacters: [],
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

  SOCKET_OPENED (state, socket) {
    state.socket = socket
  },

  SOCKET_CLOSED (state) {
    state.socket = null
  },

  SOCKET_ERROR (state, err) {
    state.socket = null
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

  APPEND_CHARACTERS (state, charlist) {
    console.time('charlist append')
    state.onlineCharacters = state.onlineCharacters.concat(charlist)
    console.timeEnd('charlist append')
  }
}

export default new Vuex.Store({ state, mutations })
