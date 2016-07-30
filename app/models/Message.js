import parseBBC from '../parse-bbc'

export default class Message {
  constructor (sender, message) {
    this.sender = sender   // Character
    this.message = parseBBC(message) // String
    this.time = Date.now()
  }
}
