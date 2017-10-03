import Vue from 'vue'
import Vuex from 'vuex'
import { userModule, UserState } from './user/modules/user-module'
import { chatModule, ChatState } from './chat/modules/chat-module'

Vue.use(Vuex)

export type RootState = {
  user: UserState
  chat: ChatState
}

export default new Vuex.Store({
  modules: {
    user: userModule,
    chat: chatModule,
  },
})
