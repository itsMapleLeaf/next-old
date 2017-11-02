import { action, observable } from "mobx"
import { OverlayState } from "src/chat/models/OverlayState"

export class ChatViewStore {
  navDrawer = new OverlayState()
  channelBrowser = new OverlayState()
  statusMenu = new OverlayState()
  friendBrowser = new OverlayState()

  @observable
  characterMenu = {
    open: false,
    x: 0,
    y: 0,
    character: "",
  }

  @action
  openCharacterMenu(character: string, x: number, y: number) {
    this.characterMenu.character = character
    this.characterMenu.x = x
    this.characterMenu.y = y
    this.characterMenu.open = true
  }

  @action.bound
  closeCharacterMenu() {
    this.characterMenu.open = false
  }
}
