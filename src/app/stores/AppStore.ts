import { action, observable } from 'mobx'
import { OverlayState } from 'src/chat/models/OverlayState'

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

  @action
  setState(state: AppState) {
    this.state = state
  }
}
