import { AppStore } from 'src/app/stores/AppStore'
import { AuthStore } from 'src/auth/stores/AuthStore'
import { ChannelBrowserStore } from 'src/channel-browser/stores/ChannelBrowserStore'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { ChatViewStore } from 'src/chat/stores/ChatViewStore'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'

const channelStore = new ChannelStore()
const privateChatStore = new PrivateChatStore()
const characterStore = new CharacterStore()
const channelBrowserStore = new ChannelBrowserStore()
const chatStore = new ChatStore(channelStore, privateChatStore, characterStore, channelBrowserStore)
const chatViewStore = new ChatViewStore(chatStore)
const authStore = new AuthStore()
const appStore = new AppStore(authStore)

const stores = {
  appStore,
  authStore,
  channelBrowserStore,
  channelStore,
  characterStore,
  chatStore,
  chatViewStore,
  privateChatStore,
}

export default stores
export type Stores = typeof stores
