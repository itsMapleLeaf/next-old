import { bind } from 'decko'
import { action, observable } from 'mobx'
import * as api from '../../api'
import * as storage from '../helpers/storage'

export type AppStoreView = 'none' | 'loading' | 'login' | 'characterSelect' | 'chat'

export class AppStore {
  @observable account = ''
  @observable ticket = ''
  @observable characters = [] as string[]
  @observable lastCharacter = ''
  @observable loginStatus = ''
  @observable loadingMessage = ''
  @observable identity = ''
  @observable view: AppStoreView = 'none'

  @action.bound
  setAuthData(account: string, ticket: string) {
    this.account = account
    this.ticket = ticket
  }

  @action.bound
  showLoading(message: string) {
    this.loadingMessage = message
    this.view = 'loading'
  }

  @action.bound
  showLogin(statusMessage = '') {
    this.loginStatus = statusMessage
    this.view = 'login'
  }

  @action.bound
  showCharacterSelect(characters: string[], lastCharacter: string) {
    this.characters = characters
    this.lastCharacter = lastCharacter
    this.view = 'characterSelect'
  }

  @action.bound
  showChat(identity: string) {
    this.identity = identity
    this.view = 'chat'
  }

  async init() {
    this.showLoading('Setting things up...')

    try {
      const auth = await storage.getAuthData()
      if (!auth) throw new Error('Auth data not found')

      const characters = await api.fetchCharacterList(auth.account, auth.ticket)
      const lastCharacter = await storage.getLastCharacter(auth.account)

      this.showCharacterSelect(characters, lastCharacter || characters[0])
    } catch {
      this.showLogin()
    }
  }

  @bind
  async handleLoginSubmit(account: string, password: string) {
    this.showLoading('Logging in...')

    try {
      const ticket = await api.fetchTicket(account, password)
      const characters = await api.fetchCharacterList(account, ticket)
      const lastCharacter = await storage.getLastCharacter(account)

      this.setAuthData(account, ticket)
      this.showCharacterSelect(characters, lastCharacter || characters[0])

      await storage.setAuthData(account, ticket)
    } catch (error) {
      this.showLogin(error.message || String(error))
      console.error('Login error', error.stack || String(error))
    }
  }

  @bind
  async handleCharacterChange(character: string) {
    await storage.setLastCharacter(this.account, character)
  }

  @bind
  handleCharacterSubmit(character: string) {
    this.showLoading('Connecting to chat...')
    //
    this.showChat(character)
  }
}
