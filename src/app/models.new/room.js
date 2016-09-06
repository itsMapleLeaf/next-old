import {newMessage} from './Message'

function newRoom (type) {
  return {
    type,
    messages: [],
    active: false
  }
}

function addMessage (room, sender, message, type) {
  this.messages.push(newMessage(sender, message, type))
}

export { newRoom, addMessage }
