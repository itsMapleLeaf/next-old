export default class ChannelRoom {
  constructor (id, name) {
    this.type = 'channel'
    this.id = id
    this.name = name
    this.description = ''
    this.mode = 'both' // either 'both', 'chat', or 'ads'
    this.characters = []
    this.messages = []
    this.ops = []
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
      case char.isFriend:
        return 5

      case char.isBookmark:
        return 4

      case char.isAdmin:
        return 3

      case this.ops.includes(char.name):
        return 2

      case char.status === 'looking':
        return 1

      default:
        return 0
    }
  }
}
