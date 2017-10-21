import { PrivateChat, Message } from './models'
import { observable } from 'mobx'

export class PrivateChatStore {
  @observable privateChats = new Map<string, PrivateChat>()
  @observable openPrivateChats = new Map<string, true>()

  getPrivateChat(partner: string) {
    let privateChat = this.privateChats.get(name)
    if (!privateChat) {
      privateChat = new PrivateChat(partner)
      this.privateChats.set(name, privateChat)
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
    return Object.keys(this.openPrivateChats).map(name => this.getPrivateChat(name))
  }

  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'PRI') {
      const privateChat = this.openPrivateChat(params.character)
      privateChat.messages.push(new Message(params.character, params.message, 'normal'))
    }
  }
}
