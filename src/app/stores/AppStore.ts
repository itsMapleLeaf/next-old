import { action, observable } from 'mobx'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'

export enum AppState {
  setup,
  login,
  characterSelect,
  connecting,
  online,
}

export class AppStore {
  @observable state = AppState.setup
  appInfo = new OverlayViewModel()

  @action
  setState(state: AppState) {
    this.state = state
  }
}
