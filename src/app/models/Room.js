import Message from './Message'

export default class Room {
  messages = []
  active = false

  constructor (type) {
    this.type = type
  }

  addMessage (sender, message, type) {
    this.messages.push(new Message(sender, message, type))
  }

  sendMessage () { /* override */ }
  close () { /* override */ }
}
