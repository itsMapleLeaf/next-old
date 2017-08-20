import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user-module'
import chat from './modules/chat-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    chat,
  },
})
