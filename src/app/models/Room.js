export default class Room {
  messages = []

  constructor (type) {
    this.type = type
  }

  addMessage (message) {
    this.messages.push(message)
  }

  sendMessage () { /* override */ }
  close () { /* override */ }
}
