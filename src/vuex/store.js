import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  account: '',
  loginData: {},
  loggedIn: false,
  loginStatusMessage: '',
  character: '',
  socket: null,
  channelList: [],
  joinedChannels: []
}

const mutations = {
  LOGIN_REQUEST (state, account) {
    state.account = account
    state.loginStatusMessage = 'Hold on...'
  },

  LOGIN_SUCCESS (state, data) {
    state.loginData = data
    state.loggedIn = true
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

  CHAT_IDENTIFY_SUCCESS (state) {}
}

export default new Vuex.Store({ state, mutations })
