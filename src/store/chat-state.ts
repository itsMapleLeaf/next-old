import { action, observable } from 'mobx'
import { Character, Channel, Message, MessageType } from './chat-state-models'

export default class ChatState {
  @observable friends = [] as string[]
  @observable ignoredUsers = [] as string[]
  @observable admins = [] as string[]
  onlineCharacters = new Map<string, Character>()
  @observable channels = new Map<string, Channel>()

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

      case 'STA': {
        const char = this.onlineCharacters.get(params.character)
        if (char) char.setStatus(params.status, params.statusmsg)
        break
      }

      case 'JCH': {
        const channel = this.channels.get(params.channel)
        const user = this.onlineCharacters.get(params.character.identity)
        if (channel && user) {
          channel.users.set(user.name, user)
        }
        break
      }

      case 'LCH': {
        const channel = this.channels.get(params.channel)
        if (channel) {
          channel.users.delete(params.character)
        }
        break
      }

      case 'COL': {
        const channel = this.channels.get(params.channel)
        if (channel) channel.ops = params.oplist
        break
      }

      case 'ICH': {
        const channel = this.channels.get(params.channel)
        if (channel) {
          for (const { identity } of params.users) {
            const user = this.onlineCharacters.get(identity)
            if (user) {
              channel.users.set(identity, user)
            }
          }
        }
        break
      }

      case 'CDS': {
        const channel = this.channels.get(params.channel)
        if (channel) channel.description = params.description
        break
      }

      case 'MSG':
      case 'LRP': {
        const channel = this.channels.get(params.channel)
        const sender = this.onlineCharacters.get(params.character)
        if (channel && sender) {
          const type = cmd === 'LRP' ? MessageType.lfrp : MessageType.normal
          channel.messages.push(new Message(sender, params.message, type))
        }
        break
      }

      default:
        console.log(cmd, params)
    }
  }
}
