import { AppStore } from "./app/stores/AppStore"
import { AuthStore } from "./auth/stores/AuthStore"
import { ChannelBrowserStore } from "./channel-browser/stores/ChannelBrowserStore"
import { ChannelStore } from "./channel/stores/ChannelStore"
import { CharacterStore } from "./character/stores/CharacterStore"
import { ChatNavigationStore } from "./chat/stores/ChatNavigationStore"
import { ChatStore } from "./chat/stores/ChatStore"
import { ChatViewStore } from "./chat/stores/ChatViewStore"
import { ConsoleStore } from "./console/stores/ConsoleStore"
import { PrivateChatStore } from "./private-chat/stores/PrivateChatStore"

const consoleStore = new ConsoleStore()
const channelStore = new ChannelStore()
const privateChatStore = new PrivateChatStore()
const characterStore = new CharacterStore()
const channelBrowserStore = new ChannelBrowserStore()
const chatStore = new ChatStore(
  channelStore,
  privateChatStore,
  characterStore,
  channelBrowserStore,
  consoleStore,
)
const chatViewStore = new ChatViewStore()
const chatNavigationStore = new ChatNavigationStore(channelStore, privateChatStore)
const authStore = new AuthStore()
const appStore = new AppStore(authStore)

export const stores = {
  appStore,
  authStore,
  channelBrowserStore,
  channelStore,
  characterStore,
  chatNavigationStore,
  chatStore,
  chatViewStore,
  consoleStore,
  privateChatStore,
}

export type Stores = typeof stores
