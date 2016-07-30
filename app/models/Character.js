import store from '../store'
import parseBBC from '../parse-bbc'

export default class Character {
  constructor (name, gender, status = 'online', statusmsg = '') {
    this.name = name
    this.gender = gender.toLowerCase()
    this.setStatus(status, statusmsg)
    this.onlineTime = Date.now()
  }

  setStatus (status, message) {
    this.status = status
    this.statusmsg = parseBBC(message)
  }

  get friends () {
    return store.friends
      .filter(entry => entry.them === this.name)
      .map(entry => entry.you)
  }

  get isFriend () {
    return this.friends.length > 0
  }

  get isBookmark () {
    return store.bookmarks.includes(this.name)
  }

  get isIgnored () {
    return store.ignored.includes(this.name)
  }
}
