export type MessageType = 'normal' | 'lfrp' | 'admin' | 'system'

export class ChatMessage {
  date = new Date()

  constructor(public type: MessageType, public text: string, public sender?: string) {}
}
