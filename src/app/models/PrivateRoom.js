import {state, sendPrivateMessage, removePrivateRoom} from '../store'
import Message from './Message'

export default class PrivateRoom {
  constructor (partner) {
    this.type = 'private'
    this.partner = partner
    this.messages = []
  }

  addMessage (message) {
    this.messages.push(message)
  }

  sendMessage (message) {
    sendPrivateMessage(this.partner.name, message)
    this.messages.push(new Message(state.userCharacter, message, 'self'))
  }

  close () {
    removePrivateRoom(this.partner.name)
  }
}
