import { action, observable } from "mobx"
import { AuthStore } from "src/auth/stores/AuthStore"
import { OverlayState } from "src/chat/models/OverlayState"
import { StoredValue } from "src/common/util/storage"

export enum AppState {
  setup,
  login,
  characterSelect,
  connecting,
  online,
}

export class AppStore {
  @observable state = AppState.setup

  appInfo = new OverlayState()
  hasRun = new StoredValue<boolean>("AppStore_hasRun")

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

    const hasRun = await this.hasRun.restore()
    if (!hasRun) {
      await this.hasRun.save(true)
      this.appInfo.show()
    }
  }
}
