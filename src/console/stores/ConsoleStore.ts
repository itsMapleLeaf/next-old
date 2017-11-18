import { action, observable } from 'mobx'
import { ChatMessage } from 'src/chat/models/ChatMessage'
import { parseBBC } from 'src/chat/util/bbc'
import { CommandInfo } from 'src/chat/util/chat-command'

export class ConsoleStore {
  @observable messages = [] as ChatMessage[]

  @action
  addMessage(text: string) {
    this.messages.push(new ChatMessage('system', text))
  }

  @action
  clear() {
    this.messages.splice(0)
  }

  @action.bound
  handleChatCommand({ command, paramString }: CommandInfo) {
    if (command === 'clear') {
      this.clear()
    } else if (command === 'preview') {
      this.addMessage('Message preview: ' + parseBBC(paramString))
    }
  }
}
