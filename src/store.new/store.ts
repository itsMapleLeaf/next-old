import { AuthStore } from './auth'
import { ChatStore } from './chat'

export class Store {
  auth = new AuthStore()
  chat = new ChatStore()
}
