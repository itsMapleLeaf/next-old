import { concat } from 'lodash'
import { action, computed, observable } from 'mobx'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { clamp } from 'src/common/util/math'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'

type ChannelRoute = { type: 'channel'; id: string }
type PrivateChatRoute = { type: 'private-chat'; partner: string }
type EmptyRoute = { type: 'none' }

export type Route = ChannelRoute | PrivateChatRoute | EmptyRoute

export class ChatNavigationStore {
  @observable private routeIndex = 0

  constructor(private channelStore: ChannelStore, private privateChatStore: PrivateChatStore) {}

  @computed
  get channelRoutes(): ChannelRoute[] {
    return this.channelStore
      .getJoinedChannelIDs()
      .map<ChannelRoute>(id => ({ type: 'channel', id }))
  }

  @computed
  get privateChatRoutes(): PrivateChatRoute[] {
    return this.privateChatStore
      .getOpenPrivateChats()
      .map<PrivateChatRoute>(({ partner }) => ({ type: 'private-chat', partner }))
  }

  @computed
  get routes(): Route[] {
    return concat<Route>(this.channelRoutes, this.privateChatRoutes)
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
