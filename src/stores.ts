import { AppStore } from './app/stores/AppStore'
import { AppViewStore } from './app/stores/AppViewStore'
import { SocketStore } from './app/stores/SocketStore'

export const stores = {
  appStore: new AppStore(),
  appViewStore: new AppViewStore(),
  socketStore: new SocketStore(),
}

export type Stores = typeof stores
