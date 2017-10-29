import { action, computed, observable } from 'mobx'

export class OverlayState {
  @observable private visible = false

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
