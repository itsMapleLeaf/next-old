function sortPriority (char) {
  if (char.isFriend) {
    return 3
  } else if (char.isBookmark) {
    return 2
  } else if (char.status === 'looking') {
    return 1
  }
  return 0
}

export default class ChannelRoom {
  constructor (id, name) {
    this.type = 'channel'
    this.id = id
    this.name = name
    this.description = ''
    this.mode = 'both'
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
      const pri1 = sortPriority(a)
      const pri2 = sortPriority(b)
      if (pri1 !== pri2) {
        return pri2 - pri1
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }
}
