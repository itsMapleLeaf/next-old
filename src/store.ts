import * as forage from 'localforage'
import { action, observable } from 'mobx'
import { fetchCharacters, fetchTicket } from './lib/f-list'

export default class Store {
  account = ''
  ticket = ''
  @observable userCharacters = [] as string[]
  identity = ''

  @action
  async loadUserData() {
    this.account = (await forage.getItem<string>('account')) || ''
    this.ticket = (await forage.getItem<string>('ticket')) || ''
  }

  @action
  async saveUserData() {
    await forage.setItem('account', this.account)
    await forage.setItem('ticket', this.ticket)
  }

  @action
  async login(account: string, password: string) {
    this.ticket = await fetchTicket(account, password)
    this.account = account
  }

  @action
  async fetchUserCharacters() {
    this.userCharacters = await fetchCharacters(this.account, this.ticket)
  }

  @action
  setIdentity(identity: string) {
    this.identity = identity
  }

  @action
  connect() {}
}
