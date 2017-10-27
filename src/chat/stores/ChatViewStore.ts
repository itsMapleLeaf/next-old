import { action, observable } from 'mobx'
import { ChatStore } from 'src/chat/stores/ChatStore'

export class ChatViewStore {
  @observable isMenuOpen = false
  @observable isChannelBrowserOpen = false
  @observable currentChannel = 'Frontpage'

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
}
