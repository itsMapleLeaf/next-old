import { observable } from 'mobx'
import { Message } from 'src/message/models/Message'

export class PrivateChat {
  @observable messages = [] as Message[]

  constructor(public partner: string) {}
}
