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

export default class Character {
  name: string
  gender: Gender
  status: Status
  statusMessage: string

  constructor (name, gender, status = 'online', statusMessage = '') {
    this.name = name
    this.gender = gender
    this.setStatus(status, statusMessage)
  }

  setStatus (status: Status, message: string) {
    this.status = status
    this.statusMessage = message
  }
}
