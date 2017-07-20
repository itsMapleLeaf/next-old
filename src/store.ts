import * as forage from 'localforage'
import * as api from './api'

class UserStore {
  account = ''
  ticket = ''
  characters = [] as string[]

  async authenticate(account: string, password: string) {
    this.account = account
    this.ticket = await api.fetchTicket(account, password)
  }

  async fetchCharacterList() {
    this.characters = await api.fetchCharacterList(
      this.account,
      this.ticket,
    )
  }

  async restoreAuthData() {
    this.account = (await forage.getItem<string>('account')) || ''
    this.ticket = (await forage.getItem<string>('ticket')) || ''
  }

  async saveAuthData() {
    await forage.setItem('account', this.account)
    await forage.setItem('ticket', this.ticket)
  }
}

export default class Store {
  user = new UserStore()
}
