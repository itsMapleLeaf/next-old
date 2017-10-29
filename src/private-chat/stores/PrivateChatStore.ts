import { observable } from 'mobx'
import { StoredValue } from 'src/common/util/storage'
import { Message } from 'src/message/models/Message'
import { PrivateChat } from 'src/private-chat/models/PrivateChat'

type StoredPrivateChats = Dictionary<string[]>

export class PrivateChatStore {
  @observable private privateChats = new Map<string, PrivateChat>()
  @observable private openPrivateChats = new Map<string, true>()

  private storedPrivateChats = new StoredValue<StoredPrivateChats>('PrivateChatStore_privateChats')

  getPrivateChat(partner: string) {
    let privateChat = this.privateChats.get(partner)
    if (!privateChat) {
      privateChat = new PrivateChat(partner)
      this.privateChats.set(partner, privateChat)
    }
    return privateChat
  }

  openPrivateChat(partner: string) {
    this.openPrivateChats.set(partner, true)
    return this.getPrivateChat(partner)
  }

  closePrivateChat(partner: string) {
    this.openPrivateChats.delete(partner)
  }

  getOpenPrivateChats() {
    return Array.from(this.openPrivateChats.keys()).map(name => this.getPrivateChat(name))
  }

  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'PRI') {
      const privateChat = this.openPrivateChat(params.character)
      privateChat.messages.push(new Message(params.character, params.message, 'normal'))
    }
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
