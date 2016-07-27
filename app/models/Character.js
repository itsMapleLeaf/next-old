import store from '../store'

export default class Character {
  constructor (name, gender, status = 'online', statusmsg = '') {
    this.name = name
    this.gender = gender.toLowerCase()
    this.status = status
    this.statusmsg = statusmsg
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
}
