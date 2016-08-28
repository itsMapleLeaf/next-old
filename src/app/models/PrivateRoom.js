import Room from './Room'
import {state, sendPrivateMessage, removePrivateRoom} from '../store'

export default class PrivateRoom extends Room {
  constructor (partner) {
    super('private')
    this.partner = partner
  }

  sendMessage (message) {
    sendPrivateMessage(this.partner.name, message)
    this.addMessage(state.userCharacter, message, 'self')
  }

  close () {
    removePrivateRoom(this.partner.name)
  }
}
