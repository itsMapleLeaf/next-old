import { action, observable } from 'mobx'
import { Message } from 'src/message/models/Message'

export type ChannelMode = 'chat' | 'ads' | 'both'

export class Channel {
  @observable title = this.id
  @observable description = ''
  @observable users = [] as string[]
  @observable messages = [] as Message[]
  @observable ops = [] as string[]
  @observable mode = 'both' as ChannelMode
  @observable selectedMode = 'both' as ChannelMode

  constructor(public id: string) {}

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
}
