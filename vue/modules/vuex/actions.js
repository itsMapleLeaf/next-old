import {Store} from 'vuex'

export function pushOverlay (store: Store, overlay: string) {
  store.dispatch('PushOverlay', overlay)
}

export function popOverlay (store: Store) {
  store.dispatch('PopOverlay')
}

export function setUserData (store, account, ticket, characters, friends, bookmarks) {
  store.dispatch('SetAuth', account, ticket)
  store.dispatch('SetUserCharacterList', characters)
  store.dispatch('SetFriendsList', friends)
  store.dispatch('SetBookmarkList', bookmarks)
}
