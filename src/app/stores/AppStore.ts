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
  @observable state = AppState.setup

  constructor(public auth: AuthStore, public chat: ChatStore) {}

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
