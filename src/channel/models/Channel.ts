import { observable } from 'mobx'
import { Message } from 'src/message/models/Message'

export class Channel {
  @observable title = this.id
  @observable description = ''
  @observable users = [] as string[]
  @observable messages = [] as Message[]
  @observable ops = [] as string[]
  @observable mode = 'both'

  constructor(public id: string) {}
}
