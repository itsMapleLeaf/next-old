import parseBBC from '../parse-bbc'

export default class Message {
  constructor (sender, message, type) {
    this.sender = sender   // Character
    this.message = parseBBC(message) // String
    this.time = Date.now()
    this.type = type // either 'chat', 'lfrp', 'self', or 'admin'
  }
}
