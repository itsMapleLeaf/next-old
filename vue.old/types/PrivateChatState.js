import Character from './Character'
import ChatMessage from './ChatMessage'

export default class PrivateChatState {
  partner: Character
  messages: ChatMessage[]

  constructor (partner) {
    this.partner = partner
    this.messages = []
  }
}
