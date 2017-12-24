import { AppStore } from './app/stores/AppStore'
import { AppViewStore } from './app/stores/AppViewStore'

export const stores = {
  appStore: new AppStore(),
  appViewStore: new AppViewStore(),
}

export type Stores = typeof stores
