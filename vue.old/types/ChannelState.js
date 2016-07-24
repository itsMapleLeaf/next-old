import Character from './Character'
import ChatMessage from './ChatMessage'
import type {MessageType} from './ChatMessage'

export type FilterMap = { [filter: MessageType]: boolean }

export default class ChannelState {
  id: string
  name: string
  description: string
  characters: Character[]
  messages: ChatMessage[]
  filter: FilterMap

  constructor (id, name) {
    this.id = id
    this.name = name
    this.description = ''
    this.characters = []
    this.messages = []
    this.filter = {
      normal: true,
      self: true,
      lfrp: true,
      friend: true,
      bookmark: true
    }
  }

  addMessage (msg: ChatMessage) {
    this.messages.push(msg)
    this.messages = this.messages.slice(-500)
  }
}
