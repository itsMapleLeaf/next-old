import { AppStore } from './app/stores/AppStore'

export const stores = {
  appStore: new AppStore(),
}

export type Stores = typeof stores

export type Injector<Props> = (stores: Stores, props: Props) => Partial<Props>
