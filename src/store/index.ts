import Vue from 'vue'
import Vuex from 'vuex'
import { chatModule, ChatState } from './chat-module'

Vue.use(Vuex)

type RootState = {
  chat: ChatState
}

const store = new Vuex.Store<RootState>({
  modules: {
    chat: chatModule,
  },
})

type Store = typeof store

export { Store, RootState }
export default store
