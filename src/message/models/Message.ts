export type MessageType = "normal" | "lfrp" | "admin" | "system"

export class Message {
  date = new Date()

  constructor(public sender: string, public text: string, public type: MessageType) {}
}
