import * as localforage from 'localforage'

export function getLastCharacter(account: string) {
  return localforage.getItem<string | null>(`${account}:lastCharacter`)
}

export function setLastCharacter(account: string, character: string) {
  return localforage.setItem<string>(`${account}:lastCharacter`, character)
}
