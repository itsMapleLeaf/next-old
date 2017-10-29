import { action, computed, observable } from 'mobx'

export type ChatViewRoute =
  | { type: 'channel'; id: string }
  | { type: 'private-chat'; partner: string }
  | { type: 'none' }

class OverlayState {
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

export class ChatViewStore {
  navigator = new OverlayState()
  channelBrowser = new OverlayState()
  statusMenu = new OverlayState()
  @observable route = { type: 'none' } as ChatViewRoute

  @observable
  characterMenu = {
    open: false,
    x: 0,
    y: 0,
    character: '',
  }

  constructor() {}

  @action.bound
  setRoute(route: ChatViewRoute) {
    this.route = route
  }

  @action
  openCharacterMenu(character: string, x: number, y: number) {
    this.characterMenu.character = character
    this.characterMenu.x = x
    this.characterMenu.y = y
    this.characterMenu.open = true
  }

  @action
  closeCharacterMenu() {
    this.characterMenu.open = false
  }
}
