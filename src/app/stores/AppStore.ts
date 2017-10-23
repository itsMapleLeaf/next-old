import { observable } from 'mobx'
import { AuthStore } from 'src/auth/stores/AuthStore'
import { ChatStore } from 'src/chat/stores/ChatStore'

export enum AppState {
  setup,
  login,
  characterSelect,
  connecting,
  online,
}

export class AppStore {
  auth = new AuthStore()
  chat = new ChatStore()

  @observable state = AppState.setup

  setState(state: AppState) {
    this.state = state
  }
}
