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
}
