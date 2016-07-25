export default class Character {
  constructor (name, gender, status = 'online', statusmsg = '') {
    this.name = name
    this.gender = gender
    this.status = status
    this.statusmsg = statusmsg
  }
}
