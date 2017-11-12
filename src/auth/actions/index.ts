import * as localforage from 'localforage'
import * as api from 'src/api'
import { authStore } from 'src/stores'

const storageKeyAuth = 'AuthStore_auth'

type AuthData = {
  account: string
  ticket: string
}

export async function fetchTicket(account: string, password: string) {
  const ticket = await api.fetchTicket(account, password)
  authStore.setAccount(account)
  authStore.setTicket(ticket)
}

export async function fetchCharacters() {
  const { account, ticket } = authStore
  authStore.setCharacters(await api.fetchCharacterList(account, ticket))
}

export async function loadAuthData() {
  const auth = await localforage.getItem<AuthData>(storageKeyAuth)
  if (auth) {
    authStore.setAccount(auth.account)
    authStore.setTicket(auth.ticket)
  }
}

export async function saveAuthData() {
  const { account, ticket } = authStore
  await localforage.setItem(storageKeyAuth, { account, ticket })
}
