import { observable } from 'mobx'
import { ChatMessage } from 'src/chat/models/ChatMessage'

export class PrivateChat {
  @observable messages = [] as ChatMessage[]

  constructor(public partner: string) {}
}
