import { action, observable } from 'mobx'

export class ChatState {
  @observable friends = [] as string[]
  @observable ignoredUsers = [] as string[]
  @observable admins = [] as string[]
  onlineCharacters = new Map<string, Character>()

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
