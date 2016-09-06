import {newRoom} from './room'
import {isFriend, isBookmark, isAdmin} from '../store'

function newChannelRoom (id, name) {
  return {
    ...newRoom('channel'),
    id,
    name,
    description: '',
    mode: 'both', // either 'both', 'chat', or 'ads'
    characters: [],
    ops: []
  }
}

function getCharacterGroups (characters, oplist) {
  const friends = characters.filter(char => isFriend(char.name))
  const bookmarks = characters.filter(char => isBookmark(char.name))
  const admins = characters.filter(char => isAdmin(char.name))
  const ops = characters.filter(char => oplist.includes(char.name))
  const looking = characters.filter(char => char.status === 'looking')

  const grouped = {}
  for (let char of [].concat(friends, bookmarks, admins, ops, looking)) {
    grouped[char] = true
  }
  const others = characters.filter(char => !grouped[char])

  return { friends, bookmarks, admins, ops, looking, others }
}

function sortCharacterList (charlist) {
  charlist.sort((a, b) => {
    const pri1 = getSortPriority(a)
    const pri2 = getSortPriority(b)
    if (pri1 !== pri2) {
      return pri2 - pri1
    } else {
      return a.name.localeCompare(b.name)
    }
  })
}

function getSortPriority ({ name, status }) {
  switch (true) {
    case isFriend(name):
      return 5
    case isBookmark(name):
      return 4
    case isAdmin(name):
      return 3
    case this.ops.includes(name):
      return 2
    case status === 'looking':
      return 1
    default:
      return 0
  }
}

export { newChannelRoom, sortCharacterList, getCharacterGroups }
