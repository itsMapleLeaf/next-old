import * as flist from './f-list'
import Character from './models/Character'

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

  // ignored characters by name
  ignored: [],

  // global admins by name
  admins: [],

  // ui overlays
  overlays: [],

  // a map of all online characters, name to Character object
  onlineCharacters: {},

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
  },

  addCharacterBatch (batch) {
    const map = {}
    for (let info of batch) {
      const char = new Character(...info)
      map[char.name] = char
    }
    Object.assign(this.onlineCharacters, map)
  },

  addCharacter (name, gender) {
    this.onlineCharacters[name] = new Character(name, gender)
  },

  removeCharacter (name) {
    delete this.onlineCharacters[name]
  },

  setCharacterStatus (name, status, message) {
    const char = this.onlineCharacters[name]
    char.status = status
    char.statusmsg = message
  },

  setIgnoreList (list) {
    this.ignored = list
  },

  setAdminList (list) {
    this.admins = list
  }
}
