import { action, observable } from 'mobx'
import { AuthStore } from 'src/auth/stores/AuthStore'

export enum AppState {
  setup,
  login,
  characterSelect,
  connecting,
  online,
}

export class AppStore {
  @observable state = AppState.setup

  constructor(private auth: AuthStore) {}

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
