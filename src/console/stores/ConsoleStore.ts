import { action, observable } from "mobx"
import { parseBBC } from "src/chat/util/bbc"
import { CommandInfo } from "src/chat/util/chat-command"
import { ConsoleMessage } from "src/console/models/ConsoleMessage"

export class ConsoleStore {
  @observable messages = [] as ConsoleMessage[]

  @action
  addMessage(text: string) {
    this.messages.push(new ConsoleMessage(text))
  }

  @action
  clear() {
    this.messages.splice(0)
  }

  @action.bound
  handleChatCommand({ command, paramString }: CommandInfo) {
    if (command === "clear") {
      this.clear()
    } else if (command === "preview") {
      this.addMessage("Message preview: " + parseBBC(paramString))
    }
  }
}
