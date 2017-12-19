import { action, observable } from 'mobx'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'

export class ChatViewStore {
  navDrawer = new OverlayViewModel()
  channelBrowser = new OverlayViewModel()
  statusMenu = new OverlayViewModel()
  friendBrowser = new OverlayViewModel()

  @observable
  characterMenu = {
    open: false,
    x: 0,
    y: 0,
    character: '',
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
