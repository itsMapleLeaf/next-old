import { action, observable } from "mobx"
import { StoredValue } from "src/common/util/storage"
import { Message } from "src/message/models/Message"
import { PrivateChat } from "src/private-chat/models/PrivateChat"

type StoredPrivateChats = Dictionary<string[]>

export class PrivateChatStore {
  private privateChats = observable.map<PrivateChat>()
  private openPrivateChats = observable.map<true>()
  private storedPrivateChats = new StoredValue<StoredPrivateChats>("PrivateChatStore_privateChats")

  @action
  getPrivateChat(partner: string) {
    let privateChat = this.privateChats.get(partner)
    if (!privateChat) {
      privateChat = new PrivateChat(partner)
      this.privateChats.set(partner, privateChat)
    }
    return privateChat
  }

  @action
  openPrivateChat(partner: string) {
    this.openPrivateChats.set(partner, true)
    return this.getPrivateChat(partner)
  }

  @action
  closePrivateChat(partner: string) {
    this.openPrivateChats.delete(partner)
  }

  @action
  handleSocketCommand(cmd: string, params: any) {
    if (cmd === "PRI") {
      const privateChat = this.openPrivateChat(params.character)
      privateChat.messages.push(new Message(params.character, params.message, "normal"))
    }
  }

  getOpenPrivateChats() {
    return Array.from(this.openPrivateChats.keys()).map(name => this.getPrivateChat(name))
  }

  async savePrivateChats(character: string) {
    const current = (await this.storedPrivateChats.restore()) || {}
    const privateChats = { ...current, [character]: Array.from(this.openPrivateChats.keys()) }
    await this.storedPrivateChats.save(privateChats)
  }

  async restorePrivateChats(character: string): Promise<string[]> {
    const restored = (await this.storedPrivateChats.restore()) || {}
    return restored[character] || []
  }
}
