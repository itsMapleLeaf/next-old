// @flow
import Vue from 'vue'
import type {Name, Relationship} from './types'

const endpoints = {
  login: 'https://www.f-list.net/json/getApiTicket.php',
  characterList: 'https://www.f-list.net/json/api/character-list.php',
  friendList: 'https://www.f-list.net/json/api/friend-list.php',
  bookmarkList: 'https://www.f-list.net/json/api/bookmark-list.php',
  bookmarkAdd: 'https://www.f-list.net/json/api/bookmark-add.php',
  bookmarkRemove: 'https://www.f-list.net/json/api/bookmark-remove.php',
}

async function endpointAction(url: string, params: Object): Promise<any> {
  const {data} = await Vue.http.post(url, params)
  return data.error ? Promise.reject(data.error) : data
}

export async function getTicket(account: string, password: string): Promise<string> {
  const data = await endpointAction(endpoints.login, { account, password })
  return data.ticket
}

export async function getCharacters(account: string, ticket: string): Promise<Name[]> {
  const data = await endpointAction(endpoints.characterList, { account, ticket })
  return data.characters
}

export async function getFriends(account: string, ticket: string): Promise<Relationship[]> {
  const data = await endpointAction(endpoints.friendList, { account, ticket })
  return data.friends.map(entry => ({ you: entry.source, them: entry.dest }))
}

export async function getBookmarks(account: string, ticket: string): Promise<Name[]> {
  const data = await endpointAction(endpoints.bookmarkList, { account, ticket })
  return data.characters
}

export function addBookmark(account: string, ticket: string, name: Name): Promise<?string> {
  return endpointAction(endpoints.bookmarkAdd, { account, ticket, name })
}

export function removeBookmark(account: string, ticket: string, name: Name): Promise<?string> {
  return endpointAction(endpoints.bookmarkRemove, { account, ticket, name })
}

export function getProfileURL(name: Name): string {
  const encoded = encodeURI(name.toLowerCase())
  return `https://www.f-list.net/c/${encoded}`
}

export function getAvatarURL(name: Name): string {
  const encoded = encodeURI(name.toLowerCase())
  return `https://static.f-list.net/images/avatar/${encoded}.png`
}

export function getExtendedIcon(icon: string): string {
  return `https://static.f-list.net/images/eicon/${icon}.gif`
}
