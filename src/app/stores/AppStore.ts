import { action, observable } from 'mobx'
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

  @action
  setState(state: AppState) {
    this.state = state
  }

  @action.bound
  async init() {
    try {
      await this.auth.loadAuthData()
      await this.auth.fetchCharacters()
      this.setState(AppState.characterSelect)
    } catch {
      this.setState(AppState.login)
    }
  }
}
