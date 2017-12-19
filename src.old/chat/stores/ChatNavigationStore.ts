import { concat, sortBy } from 'lodash'
import { action, computed, observable } from 'mobx'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { clamp } from 'src/common/util/math'
import { toLower } from 'src/common/util/string'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'

type ChannelRoute = { type: 'channel'; id: string }
type PrivateChatRoute = { type: 'private-chat'; partner: string }
type ConsoleRoute = { type: 'console' }
type EmptyRoute = { type: 'none' }

export type Route = ConsoleRoute | ChannelRoute | PrivateChatRoute | EmptyRoute

// IDEA: Turn this into a model and put it in ChatViewStore instead?
export class ChatNavigationStore {
  consoleRoute = { type: 'console' } as ConsoleRoute

  @observable private routeIndex = 0

  constructor(private channelStore: ChannelStore, private privateChatStore: PrivateChatStore) {}

  @computed
  get channelRoutes(): ChannelRoute[] {
    const sortedIDs = sortBy(this.channelStore.getJoinedChannelIDs(), toLower)
    return sortedIDs.map<ChannelRoute>(id => ({ type: 'channel', id }))
  }

  @computed
  get privateChatRoutes(): PrivateChatRoute[] {
    const names = this.privateChatStore.getOpenPrivateChats().map(chat => chat.partner)
    const sortedNames = sortBy(names, toLower)
    return sortedNames.map<PrivateChatRoute>(partner => ({ type: 'private-chat', partner }))
  }

  @computed
  get routes(): Route[] {
    return concat<Route>([this.consoleRoute], this.channelRoutes, this.privateChatRoutes)
  }

  @computed
  get currentRoute(): Route {
    const routes = this.routes
    const index = clamp(this.routeIndex, 0, routes.length - 1)
    return this.routes[index] || { type: 'none' }
  }

  @action
  setRouteIndex(index: number) {
    this.routeIndex = index
  }

  @action
  setRoute(route: Route) {
    const index = this.routes.indexOf(route)
    if (index > -1) {
      this.setRouteIndex(index)
    }
  }
}
