import { Message } from 'src/message/models/Message'

export class Channel {
  title = this.id
  description = ''
  users = [] as string[]
  messages = [] as Message[]
  ops = [] as string[]
  mode = 'both'

  constructor(public id: string) {}
}
