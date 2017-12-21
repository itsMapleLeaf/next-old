import { action, observable } from 'mobx'
import * as api from '../../api'
import * as storage from '../helpers/storage'

export type AppStoreView =
  | { name: 'none' }
  | { name: 'loading'; message: string }
  | { name: 'login'; statusMessage: string }
  | { name: 'characterSelect'; characters: string[]; lastCharacter: string }
  | { name: 'chat'; identity: string }

export class AppStore {
  @observable account = ''
  @observable ticket = ''
  @observable view: AppStoreView = { name: 'none' }

  @action
  setAuthData(account: string, ticket: string) {
    this.account = account
    this.ticket = ticket
  }

  @action
  showLoading(message: string) {
    this.view = { name: 'loading', message }
  }

  @action
  showLogin(statusMessage = '') {
    this.view = { name: 'login', statusMessage }
  }

  @action
  showCharacterSelect(characters: string[], lastCharacter: string) {
    this.view = { name: 'characterSelect', characters, lastCharacter }
  }

  @action
  showChat(identity: string) {
    this.view = { name: 'chat', identity }
  }

  async init() {
    this.showLogin()
  }

  async handleLogin(account: string, password: string) {
    this.showLoading('Logging in...')

    try {
      const ticket = await api.fetchTicket(account, password)
      const characters = await api.fetchCharacterList(account, ticket)
      const lastCharacter = await storage.getLastCharacter(account)

      this.setAuthData(account, ticket)
      this.showCharacterSelect(characters, lastCharacter || characters[0])
    } catch (error) {
      this.showLogin(error.message || String(error))
      console.error('Login error', error.stack || String(error))
    }
  }

  async handleCharacterChange(character: string) {
    await storage.setLastCharacter(this.account, character)
  }

  handleCharacterSubmit(character: string) {
    this.showLoading('Connecting to chat...')
    //
    this.showChat(character)
  }
}
