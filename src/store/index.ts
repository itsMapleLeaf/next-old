import UserStore from './user'
import ChatStore from './chat'

export default class Store {
  user = new UserStore()
  chat = new ChatStore()
}
