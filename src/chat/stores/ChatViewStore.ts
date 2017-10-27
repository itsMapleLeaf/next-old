import { action, observable } from 'mobx'
import { ChatStore } from 'src/chat/stores/ChatStore'

export type ChatViewRoute =
  | { type: 'channel'; id: string }
  | { type: 'private-chat'; partner: string }
  | { type: 'none' }

export class ChatViewStore {
  @observable isMenuOpen = false
  @observable isChannelBrowserOpen = false
  @observable route = { type: 'none' } as ChatViewRoute

  @observable
  characterMenu = {
    open: false,
    x: 0,
    y: 0,
    character: '',
  }

  constructor(private chatStore: ChatStore) {}

  @action.bound
  setRoute(route: ChatViewRoute) {
    this.route = route
  }

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
