import * as api from '../api'
import { connectToServer } from '../socket/actions'
import { stores } from '../stores'
import * as storage from './helpers/storage'

export function testInit() {
  stores.appViewStore.showChat()
}

export async function init() {
  stores.appViewStore.showLoading('Setting things up...')

  try {
    const auth = await storage.getAuthData()
    if (!auth) throw new Error('Auth data not found')

    const characters = await api.fetchCharacterList(auth.account, auth.ticket)
    const lastCharacter = await storage.getLastCharacter(auth.account)

    stores.appStore.setAuthData(auth.account, auth.ticket)
    stores.appStore.setCharacterList(characters)
    stores.appStore.setLastCharacter(lastCharacter || characters[0])
    stores.appViewStore.showCharacterSelect()
  } catch {
    stores.appViewStore.showLogin()
  }
}

export async function handleLoginSubmit(account: string, password: string) {
  stores.appViewStore.showLoading('Logging in...')

  try {
    const ticket = await api.fetchTicket(account, password)
    const characters = await api.fetchCharacterList(account, ticket)
    const lastCharacter = await storage.getLastCharacter(account)

    stores.appStore.setAuthData(account, ticket)
    stores.appStore.setCharacterList(characters)
    stores.appStore.setLastCharacter(lastCharacter || characters[0])
    stores.appViewStore.showCharacterSelect()

    await storage.setAuthData(account, ticket)
  } catch (error) {
    stores.appViewStore.showLogin(error.message || String(error))
    console.error('Login error', error.stack || String(error))
  }
}

export async function handleCharacterChange(character: string) {
  await storage.setLastCharacter(stores.appStore.account, character)
}

export function handleCharacterSubmit(character: string) {
  stores.appViewStore.showLoading('Connecting to chat...')
  connectToServer(character)
}
