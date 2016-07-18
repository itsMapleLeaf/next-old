import Character from './Character'

export type MessageType = 'normal' | 'self' | 'lfrp' | 'friend' | 'bookmark'

export default class ChatMessage {
  sender: Character
  message: string
  type: MessageType
  time: Date

  constructor (sender, message, type) {
    this.sender = sender
    this.message = message
    this.type = type
    this.time = new Date()
  }
}
