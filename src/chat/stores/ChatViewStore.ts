import { action, computed, observable } from 'mobx'
import { Channel } from 'src/channel/models/Channel'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { OverlayState } from 'src/chat/models/OverlayState'
import { clamp } from 'src/common/util/math'
import { PrivateChat } from 'src/private-chat/models/PrivateChat'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'

export type ChannelRoute = { type: 'channel'; channel: Channel }
export type PrivateChatRoute = { type: 'private-chat'; privateChat: PrivateChat }
export type EmptyRoute = { type: 'none' }

export type ChatRoute = ChannelRoute | PrivateChatRoute | EmptyRoute

class Router {
  @observable routeIndex = 0

  constructor(private channelStore: ChannelStore, private privateChatStore: PrivateChatStore) {}

  @computed
  get routes(): ChatRoute[] {
    const channelRoutes = this.channelStore
      .getJoinedChannels()
      .map<ChannelRoute>(channel => ({ type: 'channel', channel }))
      .sort((a, b) => a.channel.title.localeCompare(b.channel.title))

    const privateChatRoutes = this.privateChatStore
      .getOpenPrivateChats()
      .map<PrivateChatRoute>(privateChat => ({ type: 'private-chat', privateChat }))
      .sort((a, b) => a.privateChat.partner.localeCompare(b.privateChat.partner))

    return (channelRoutes as ChatRoute[]).concat(privateChatRoutes)
  }

  @computed
  get currentRoute(): ChatRoute {
    const index = clamp(this.routeIndex, 0, this.routes.length - 1)
    return this.routes[index] || { type: 'none' }
  }

  @action
  setRouteIndex(index: number) {
    this.routeIndex = index
  }
}

export class ChatViewStore {
  navigator = new OverlayState()
  channelBrowser = new OverlayState()
  statusMenu = new OverlayState()
  friendBrowser = new OverlayState()
  router = new Router(this.channelStore, this.privateChatStore)

  @observable
  characterMenu = {
    open: false,
    x: 0,
    y: 0,
    character: '',
  }

  constructor(private channelStore: ChannelStore, private privateChatStore: PrivateChatStore) {}

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
