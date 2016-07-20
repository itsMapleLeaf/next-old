export function pushOverlay ({dispatch}, overlay: string) {
  dispatch('PushOverlay', overlay)
}

export function popOverlay ({dispatch}) {
  dispatch('PopOverlay')
}

export function setUserData ({dispatch}, account, ticket, characters, friends, bookmarks) {
  dispatch('SetAuth', account, ticket)
  dispatch('SetUserCharacterList', characters)
  dispatch('SetFriendsList', friends)
  dispatch('SetBookmarkList', bookmarks)
}

export function setLoadingMessage ({dispatch}, message) {
  dispatch('SetLoadingMessage', message || '')
}
