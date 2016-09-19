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

function endpointAction(url: string, data: Object): Promise<any> {
  return Vue.http.post(url, data).then(res => {
    const data = JSON.parse(res.data)
    return data.error ? Promise.reject(data.error) : Promise.resolve(data)
  })
}

export function getTicket(account: string, password: string): Promise<string> {
  return endpointAction(endpoints.login, { account, password }).then(data => {
    return data.ticket
  })
}

export function getCharacters(account: string, ticket: string): Promise<Name[]> {
  return endpointAction(endpoints.characterList, { account, ticket }).then(data => {
    return data.characters
  })
}

export function getFriends(account: string, ticket: string): Promise<Relationship[]> {
  return endpointAction(endpoints.friendList, { account, ticket }).then(data => {
    return data.friends.map(entry => ({ you: entry.source, them: entry.dest }))
  })
}

export function getBookmarks(account: string, ticket: string): Promise<Name[]> {
  return endpointAction(endpoints.bookmarkList, { account, ticket }).then(data => {
    return data.characters
  })
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
