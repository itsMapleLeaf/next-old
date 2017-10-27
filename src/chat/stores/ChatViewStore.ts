import { action, observable } from 'mobx'
import { ChatStore } from 'src/chat/stores/ChatStore'

export class ChatViewStore {
  @observable isMenuOpen = false
  @observable isChannelBrowserOpen = false
  @observable currentChannel = 'Frontpage'

  @observable
  characterMenu = {
    open: false,
    x: 0,
    y: 0,
    character: '',
  }

  constructor(private chatStore: ChatStore) {}

  @action.bound
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  @action.bound
  toggleChannelBrowser() {
    const open = (this.isChannelBrowserOpen = !this.isChannelBrowserOpen)
    if (open) {
      this.chatStore.fetchChannelList()
    }
  }

  @action.bound
  setCurrentChannel(id: string) {
    this.currentChannel = id
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
