import {state} from './state'
import type {Name} from './state'
import storage from 'localforage'
import * as flist from '../lib/f-list'

export const store = {
  init () {
    this.authenticate()
  },

  authenticate () {
    state.loadingMessage = 'Setting things up...'
    storage.getItem('auth').then(auth => {
      return auth ? Promise.resolve(auth) : Promise.reject()
    })
    .then(({ account, ticket }) => {
      state.account = account
      state.ticket = ticket
      return this.openCharacterList(account, ticket)
    })
    .then(() => {
      state.loadingMessage = ''
    })
    .catch(() => {
      state.loadingMessage = ''
      state.currentView = 'Login'
    })
  },

  login (account: string, password: string, remember: boolean): Promise<void> {
    state.loadingMessage = 'Logging in...'
    return flist.getTicket(account, password).then(ticket => {
      const data = { account, ticket }
      if (remember) {
        storage.setItem('auth', data)
      } else {
        storage.clear()
      }
      return data
    })
    .then(auth => {
      return this.openCharacterList(auth.account, auth.ticket)
    })
    .then(() => {
      state.loadingMessage = ''
    })
    .catch(err => {
      return Promise.reject(err || `
        Could not connect to the F-list website.
        Either they're doing maintenance,
        or someone spilled coke on the servers again.
      `)
    })
  },

  setIdentity (name: Name) {
    state.identity = name
    state.currentView = 'Chat'
  },

  openCharacterList (account: string, ticket: string): Promise<void> {
    return flist.getCharacters(account, ticket).then(characters => {
      state.userCharacters = characters
      state.currentView = 'CharacterList'
    })
  }
}
