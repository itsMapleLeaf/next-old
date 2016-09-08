import state from './state'
import * as flist from '../f-list'
import * as user from './user'

export function fetchUserData (account, ticket) {
  setAuthInfo(account, ticket)

  return Promise.all([
    flist.getCharacters(account, ticket),
    flist.getFriends(account, ticket),
    flist.getBookmarks(account, ticket)
  ])
  .then(([characters, friends, bookmarks]) => {
    user.setCharacterList(characters)
    user.setFriends(friends)
    user.setBookmarks(bookmarks)
  })
}

export function setAuthInfo (account, ticket) {
  state.account = account
  state.ticket = ticket
}
