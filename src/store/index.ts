import Vue from 'vue'
import Vuex from 'vuex'
import { authModule, AuthState } from './auth-module'
import { chatModule, ChatState } from './chat-module'

Vue.use(Vuex)

type RootState = {
  user: AuthState
  chat: ChatState
}

const store = new Vuex.Store<RootState>({
  modules: {
    user: authModule,
    chat: chatModule,
  },
})

type Store = typeof store

export { Store, RootState }
export default store
