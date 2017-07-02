import { ChatStore } from './chat'
import { UserStore } from './user'

export class Store {
  chat = new ChatStore()
  user = new UserStore()
}
