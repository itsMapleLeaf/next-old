import { AuthStore } from './AuthStore'
import { ChatStore } from './ChatStore'

export class Store {
  auth = new AuthStore()
  chat = new ChatStore()
}
