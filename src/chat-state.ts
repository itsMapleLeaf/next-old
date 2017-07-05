import { action, observable } from 'mobx'

class Character {
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

class Channel {
  @observable title = this.id
  @observable description = ''
  @observable users = [] as Character[]
  @observable messages = [] as Message[]
  constructor(public id: string) {}
}

class Message {
  date = new Date()
  constructor(public sender: Character, public text: string) {}
}

export class ChatState {
  @observable friends = [] as string[]
  @observable ignoredUsers = [] as string[]
  @observable admins = [] as string[]
  onlineCharacters = new Map<string, Character>()
  channels = new Map<string, Channel>()

  @action
  addChannel(id: string) {
    if (!this.channels.has(id)) {
      this.channels.set(id, new Channel(id))
    }
  }

  @action
  removeChannel(id: string) {
    this.channels.delete(id)
  }

  @action
  handleSocketCommand(cmd: string, params: { [k: string]: any }) {
    switch (cmd) {
      case 'VAR':
      case 'PIN':
        break

      case 'IDN':
        console.info('Successfully connected to server')
        break

      case 'HLO':
        console.info(params.message)
        break

      case 'CON':
        console.info(`There are ${params.count} characters online.`)
        break

      case 'FRL':
        this.friends = params.characters
        break

      case 'IGN':
        if (params.action === 'init') this.ignoredUsers = params.characters
        break

      case 'ADL':
        this.admins = params.ops
        break

      case 'LIS': {
        for (const [name, gender, status, statusMessage] of params.characters) {
          this.onlineCharacters.set(name, new Character(name, gender, status, statusMessage))
        }
        break
      }

      case 'NLN':
        this.onlineCharacters.set(
          params.identity,
          new Character(params.identity, params.gender, params.status)
        )
        break

      case 'FLN':
        this.onlineCharacters.delete(params.character)
        break

      case 'STA':
        const char = this.onlineCharacters.get(params.character)
        if (char) char.setStatus(params.status, params.statusmsg)
        break

      default:
        console.log(cmd, params)
    }
  }
}
