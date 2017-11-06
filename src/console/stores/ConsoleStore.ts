import { action, observable } from "mobx"
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
  handleChatCommand({ command }: CommandInfo) {
    if (command === "clear") {
      this.clear()
    }
  }
}
