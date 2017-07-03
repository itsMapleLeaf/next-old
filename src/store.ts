import { action, observable } from 'mobx'
import { fetchCharacters, fetchTicket } from './lib/f-list'

export default class Store {
  account = ''
  ticket = ''
  @observable userCharacters = [] as string[]

  @action
  async login(account: string, password: string) {
    this.ticket = await fetchTicket(account, password)
    this.account = account
  }

  @action
  async fetchUserCharacters() {
    this.userCharacters = await fetchCharacters(this.account, this.ticket)
  }
}
