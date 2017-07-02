import { action, observable } from 'mobx'
import * as flist from '../lib/f-list'

export class UserStore {
  account = ''
  ticket = ''
  @observable characters = [] as string[]

  @action
  loadUserData() {
    this.account = localStorage.getItem('account') || ''
    this.ticket = localStorage.getItem('ticket') || ''
  }

  @action
  saveUserData() {
    localStorage.setItem('account', this.account)
    localStorage.setItem('ticket', this.ticket)
  }

  @action
  async fetchTicket(account: string, password: string) {
    this.account = account
    this.ticket = await flist.fetchTicket(this.account, password)
  }

  @action
  async fetchCharacters() {
    this.characters = await flist.fetchCharacters(this.account, this.ticket)
  }
}
