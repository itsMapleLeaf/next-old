import * as forage from 'localforage'
import { action, observable } from 'mobx'
import * as api from 'src/api'

const storageKeyAuth = 'AuthStore_auth'

type AuthData = {
  account: string
  ticket: string
}

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

  async fetchTicket(account: string, password: string) {
    const ticket = await api.fetchTicket(account, password)
    this.setAccount(account)
    this.setTicket(ticket)
  }

  async fetchCharacters() {
    const { account, ticket } = this
    this.setCharacters(await api.fetchCharacterList(account, ticket))
  }

  async loadAuthData() {
    const auth = await forage.getItem<AuthData>(storageKeyAuth)
    if (auth) {
      this.setAccount(auth.account)
      this.setTicket(auth.ticket)
    }
  }

  async saveAuthData() {
    const { account, ticket } = this
    await forage.setItem(storageKeyAuth, { account, ticket })
  }
}
