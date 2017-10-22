import { AuthStore } from 'src/auth/stores/AuthStore'
import { ChatStore } from 'src/chat/stores/ChatStore'

export class AppStore {
  auth = new AuthStore()
  chat = new ChatStore()
}
