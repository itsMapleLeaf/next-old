import { action, computed, observable } from 'mobx'
import { ChatMessage } from 'src/chat/models/ChatMessage'
import { parseBBC } from 'src/chat/util/bbc'

export type ChannelMode = 'chat' | 'ads' | 'both'

export class Channel {
  @observable title = this.id
  @observable description = ''
  @observable users = [] as string[]
  @observable messages = [] as ChatMessage[]
  @observable ops = [] as string[]
  @observable mode = 'both' as ChannelMode
  @observable selectedMode = 'chat' as ChannelMode

  constructor(public id: string) {}

  @action
  setTitle(title: string) {
    this.title = title
  }

  @action
  setMode(mode: ChannelMode) {
    this.mode = mode
  }

  @action
  setSelectedMode(mode: ChannelMode) {
    this.selectedMode = mode
  }

  @action
  setDescription(description: string) {
    this.description = description
  }

  @action
  setOps(ops: string[]) {
    this.ops = ops
  }

  @action
  addMessage(message: ChatMessage) {
    this.messages.push(message)
  }

  @action
  setUsers(users: string[]) {
    this.users = users
  }

  @action
  addUser(name: string) {
    this.users.push(name)
  }

  @action
  removeUser(name: string) {
    const index = this.users.indexOf(name)
    if (index > -1) {
      this.users.splice(index, 1)
    }
  }

  getUsers(): string[] {
    return this.users
  }

  getUserCount(): number {
    return this.users.length
  }

  @computed
  get parsedDescription() {
    const text = this.description.trim()
    if (text !== '') {
      return parseBBC(this.description)
    }
    return 'No description found.'
  }

  @computed
  get filteredMessages() {
    if (this.mode !== 'both') {
      return this.messages
    }
    if (this.selectedMode === 'chat') {
      return this.messages.filter(msg => msg.type === 'normal')
    }
    if (this.selectedMode === 'ads') {
      return this.messages.filter(msg => msg.type === 'lfrp')
    }
    return this.messages
  }
}
