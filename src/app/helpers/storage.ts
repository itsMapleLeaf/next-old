import * as localforage from 'localforage'

export function getLastCharacter(account: string) {
  return localforage.getItem<string | null>(`${account}:lastCharacter`)
}

export function setLastCharacter(account: string, character: string) {
  return localforage.setItem<string>(`${account}:lastCharacter`, character)
}

type AuthData = {
  account: string
  ticket: string
}

export function getAuthData() {
  return localforage.getItem<AuthData | null>('authData')
}

export function setAuthData(account: string, ticket: string) {
  return localforage.setItem<AuthData>('authData', { account, ticket })
}
