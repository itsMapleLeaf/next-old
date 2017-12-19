import { AppStore } from './app/stores/AppStore'
import { AuthStore } from './auth/stores/AuthStore'
import { ChannelBrowserStore } from './channel-browser/stores/ChannelBrowserStore'
import { ChannelStore } from './channel/stores/ChannelStore'
import { CharacterStore } from './character/stores/CharacterStore'
import { ChatNavigationStore } from './chat/stores/ChatNavigationStore'
import { ChatStore } from './chat/stores/ChatStore'
import { ChatViewStore } from './chat/stores/ChatViewStore'
import { ConsoleStore } from './console/stores/ConsoleStore'
import { PrivateChatStore } from './private-chat/stores/PrivateChatStore'

export const consoleStore = new ConsoleStore()
export const channelStore = new ChannelStore()
export const privateChatStore = new PrivateChatStore()
export const characterStore = new CharacterStore()
export const channelBrowserStore = new ChannelBrowserStore()
export const chatStore = new ChatStore(characterStore)
export const chatViewStore = new ChatViewStore()
export const chatNavigationStore = new ChatNavigationStore(channelStore, privateChatStore)
export const authStore = new AuthStore()
export const appStore = new AppStore()

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
