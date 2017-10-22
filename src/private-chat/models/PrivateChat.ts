import { Message } from 'src/message/models/Message'

export class PrivateChat {
  messages = [] as Message[]

  constructor(public partner: string) {}
}
