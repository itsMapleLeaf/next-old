export class ChannelInfo {
  constructor(
    public type: 'public' | 'private',
    public id: string,
    public title: string,
    public userCount: number,
  ) {}
}

export class Channel {
  title = this.id
  description = ''
  users = [] as string[]
  messages = [] as Message[]
  ops = [] as string[]
  mode = 'both'

  constructor(public id: string) {}
}

export class Character {
  constructor(
    public name: string,
    public gender: string,
    public status: string,
    public statusMessage = '',
  ) {}
}

export class Message {
  date = new Date()

  constructor(
    public sender: string,
    public text: string,
    public type: 'normal' | 'lfrp' | 'admin' | 'system',
  ) {}
}

export class PrivateChat {
  messages = [] as Message[]

  constructor(public partner: string) {}
}
