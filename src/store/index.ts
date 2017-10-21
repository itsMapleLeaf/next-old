import { AuthStore } from './auth/AuthStore'
import { ChatStore } from './chat/ChatStore'

export class Store {
  auth = new AuthStore()
  chat = new ChatStore()
}
