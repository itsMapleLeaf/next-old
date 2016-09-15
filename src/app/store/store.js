import {state} from './state'
import type {Name} from './state'
import storage from 'localforage'
import * as flist from '../lib/f-list'

export const store = {
  init () {
    storage.getItem('auth').then(auth => {
      if (!auth) {
        return Promise.reject()
      } else {
        state.loadingMessage = 'Setting things up...'
        return flist.getCharacters(auth.account, auth.ticket)
      }
    })
    .then(characters => {
      state.userCharacters = characters
      state.loadingMessage = ''
      state.currentView = 'CharacterList'
    })
    .catch(() => {
      state.loadingMessage = ''
      state.currentView = 'Login'
    })
  },

  login (account: string, password: string, remember: boolean): Promise<void> {
    return flist.getTicket(account, password).then(ticket => {
      if (remember) {
        storage.setItem('auth', { account, ticket })
      } else {
        storage.clear()
      }
    })
    .catch(err => {
      if (err) {
        return Promise.reject('Wrong username or password.')
      } else {
        return Promise.reject(`
          Could not connect to the F-list website.
          Either they're doing maintenance,
          or someone spilled coke on the servers again.
        `)
      }
    })
  },

  setIdentity (name: Name) {
    state.identity = name
    state.currentView = 'Chat'
  }
}
