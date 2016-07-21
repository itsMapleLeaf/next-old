type CharacterName = string

export type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-Herm'
  | 'Cunt-boy'
  | 'None'

export type Status
  = 'online'
  | 'looking'
  | 'busy'
  | 'away'
  | 'dnd'
  | 'idle'
  | 'offline'
  | 'crown' // ???

export type FriendInfo = { you: CharacterName, them: CharacterName }

export default class Character {
  name: CharacterName
  gender: Gender
  status: Status
  statusMessage: string
  onlineSince: ?number

  constructor (state, name, gender, status = 'online', statusMessage = '') {
    this.name = name
    this.gender = gender
    this.setStatus(status, statusMessage)
    this.state = state
  }

  setStatus (status, message) {
    this.status = status
    this.statusMessage = message
  }

  getFriends (): CharacterName[] {
    return this.state.chat.friends
      .filter(entry => entry.them === this.name)
      .map(entry => entry.you)
  }

  isBookmarked (): boolean {
    return this.state.chat.bookmarks.includes(this.name)
  }

  isIgnored (): boolean {
    return this.state.chat.ignored.includes(this.name)
  }

  isAdmin (): boolean {
    return this.state.chat.admins.includes(this.name)
  }
}
