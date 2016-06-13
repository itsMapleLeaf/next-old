import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  account: '',
  userData: {},
  loggedIn: false
}

const mutations = {
  LOGIN_REQUEST (state, account) {
    state.account = account
  },

  LOGIN_SUCCESS (state, data) {
    state.userData = data
    state.loggedIn = true
  },

  LOGIN_FAILURE (state, err) {
    console.error(err)
  }
}

export default new Vuex.Store({ state, mutations })
