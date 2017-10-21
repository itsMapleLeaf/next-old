import * as api from '@/api'
import forage from 'localforage'

const storageKeyAuth = 'AuthStore_auth'

type AuthData = {
  account: string
  ticket: string
}

export class AuthStore {
  account = ''
  ticket = ''
  characters = [] as string[]

  async fetchTicket(account: string, password: string) {
    const ticket = await api.fetchTicket(account, password)
    this.account = account
    this.ticket = ticket
  }

  async fetchCharacters() {
    const { account, ticket } = this
    this.characters = await api.fetchCharacterList(account, ticket)
  }

  async loadAuthData() {
    const auth = await forage.getItem<AuthData>(storageKeyAuth)
    if (auth) {
      this.account = auth.account
      this.ticket = auth.ticket
    }
  }

  async saveAuthData() {
    const { account, ticket } = this
    await forage.setItem(storageKeyAuth, { account, ticket })
  }
}
