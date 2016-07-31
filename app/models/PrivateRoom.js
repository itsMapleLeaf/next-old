export default class PrivateRoom {
  constructor (partner) {
    this.partner = partner
    this.messages = []
  }

  addMessage (message) {
    this.messages.push(message)
  }
}
