import * as flist from './f-list'

export default {
  // auth information
  account: '',
  ticket: '',

  // our current identity
  identity: '',

  // our list of characters
  characters: [],

  // a list of friendship entries: { you: yourCharacter, them: theirCharacter }
  friends: [],

  // our bookmarks by name
  bookmarks: [],

  // ui overlays
  overlays: [],

  pushOverlay (overlay) {
    this.overlays.push(overlay)
  },

  popOverlay () {
    this.overlays.pop()
  },

  fetchUserData (account, ticket) {
    this.account = account
    this.ticket = ticket

    return Promise.all([
      flist.getCharacters(account, ticket),
      flist.getFriends(account, ticket),
      flist.getBookmarks(account, ticket)
    ])
    .then(data => {
      this.characters = data[0]
      this.friends = data[1]
      this.bookmarks = data[2]
    })
  },

  setIdentity (name) {
    this.identity = name
  }
}
