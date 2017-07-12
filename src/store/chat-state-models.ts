import { action, observable } from 'mobx'

export class Character {
  @observable status = 'online'
  @observable statusMessage = ''

  constructor(public name: string, public gender: string, status = 'online', statusMessage = '') {
    this.setStatus(status, statusMessage)
  }

  @action
  setStatus(status: string, statusMessage: string) {
    this.status = status
    this.statusMessage = statusMessage
  }
}

export class Channel {
  @observable title = this.id
  @observable description = ''
  @observable users = new Map<string, Character>()
  @observable messages = [] as Message[]
  @observable ops = [] as string[]
  constructor(public id: string) {}
}

export class Message {
  date = new Date()
  id = Math.random().toString()
  constructor(public sender: Character, public text: string, public type: MessageType) {}
}

export enum MessageType {
  normal,
  lfrp,
  admin,
}
