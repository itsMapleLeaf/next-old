import parseBBC from '../parse-bbc'

export default class Message {
  constructor (sender, message, type) {
    this.sender = sender   // Character object
    this.originalMessage = message
    this.message = parseBBC(message)
    this.time = Date.now()
    this.type = type // either 'chat', 'lfrp', 'self', 'admin', 'friend'
    this.id = Math.random() * 999999
  }
}
