import { action, observable } from 'mobx'

export class AuthStore {
  @observable account = ''
  @observable ticket = ''
  @observable characters = [] as string[]

  @action
  setAccount(account: string) {
    this.account = account
  }

  @action
  setTicket(ticket: string) {
    this.ticket = ticket
  }

  @action
  setCharacters(characters: string[]) {
    this.characters = characters
  }
}
