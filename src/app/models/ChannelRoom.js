import Room from './Room'
import {state, sendChannelMessage, removeChannelRoom} from '../store'

export default class ChannelRoom extends Room {
  description = ''
  mode = 'both' // either 'both', 'chat', or 'ads'
  characters = []
  ops = []

  constructor (id, name) {
    super('channel')
    this.id = id
    this.name = name
  }

  setCharacters (list) {
    this.characters = list
    this.sortCharacters()
  }

  addCharacter (char) {
    this.characters.push(char)
    this.sortCharacters()
  }

  removeCharacter (char) {
    const index = this.characters.indexOf(char)
    index > -1 && this.characters.splice(index, 1)
    this.sortCharacters()
  }

  sortCharacters () {
    this.characters.sort((a, b) => {
      const pri1 = this.getSortPriority(a)
      const pri2 = this.getSortPriority(b)
      if (pri1 !== pri2) {
        return pri2 - pri1
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }

  getSortPriority (char) {
    switch (true) {
      case state.friends[char.name] != null:
        return 5
      case state.bookmarks[char.name] != null:
        return 4
      case state.admins[char.name] != null:
        return 3
      case this.ops.includes(char.name):
        return 2
      case char.status === 'looking':
        return 1
      default:
        return 0
    }
  }

  sendMessage (message) {
    sendChannelMessage(this.id, message)
    this.addMessage(state.userCharacter, message, 'self')
  }

  close () {
    removeChannelRoom(this.id)
  }
}
