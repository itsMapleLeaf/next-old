import { action, computed, observable } from 'mobx'

export class OverlayState {
  @observable private visible: boolean

  constructor(visible = false) {
    this.visible = visible
  }

  @action.bound
  show() {
    this.visible = true
  }

  @action.bound
  hide() {
    this.visible = false
  }

  @action.bound
  toggle() {
    this.visible = !this.visible
  }

  @computed
  get isOpen() {
    return this.visible
  }
}
