import { action, observable } from 'mobx'

export class AppStore {
  @observable account = ''
  @observable ticket = ''
  @observable characters = [] as string[]
  @observable lastCharacter = ''

  @action.bound
  setAuthData(account: string, ticket: string) {
    this.account = account
    this.ticket = ticket
  }

  @action.bound
  setCharacterList(characters: string[]) {
    this.characters = characters
  }

  @action.bound
  setLastCharacter(lastCharacter: string) {
    this.lastCharacter = lastCharacter
  }
}
