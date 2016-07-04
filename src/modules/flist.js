import {http} from 'vue'
import type {CharacterName} from './types/character'

type ErrorResponse = { error: string }
type SuccessResponse = { error: '' }

type AuthResponse = {
  error: '',
  ticket: string,
  characters: string[],
  friends: { source_name: CharacterName, dest_name: CharacterName },
  bookmarks: { name: CharacterName }[],
  default_character: CharacterName
}

type CharacterListResponse = { error: '', characters: CharacterName[] }
type FriendsListResponse = { error: '', friends: CharacterName[] }
type BookmarksListResponse = { error: '', characters: CharacterName[] }
type BookmarkAddResponse = SuccessResponse
type BookmarkRemoveResponse = SuccessResponse

const endpoints = {
  login: 'https://www.f-list.net/json/getApiTicket.php',
  characterList: 'https://www.f-list.net/json/api/character-list.php',
  friendsList: 'https://www.f-list.net/json/api/friend-list.php',
  bookmarkList: 'https://www.f-list.net/json/api/bookmark-list.php',
  bookmarkAdd: 'https://www.f-list.net/json/api/bookmark-add.php',
  bookmarkRemove: 'https://www.f-list.net/json/api/bookmark-remove.php'
}

export async function authenticate (account: string, password: string): Promise {
  const {data} = await http.post(endpoints.login, { account, password })
  return (data: AuthResponse | ErrorResponse)
}

export async function getUserCharacters (account: string, ticket: string): Promise {
  const {data} = await http.post(endpoints.characterList, { account, ticket })
  return (data: CharacterListResponse | ErrorResponse)
}

export async function getFriendsList (account: string, ticket: string): Promise {
  const {data} = await http.post(endpoints.friendsList, { account, ticket })
  return (data: FriendsListResponse | ErrorResponse)
}

export async function getBookmarkList (account: string, ticket: string): Promise {
  const {data} = await http.post(endpoints.bookmarkList, { account, ticket })
  return (data: BookmarksListResponse | ErrorResponse)
}

export async function addBookmark (account: string, ticket: string, name: CharacterName): Promise {
  const {data} = await http.post(endpoints.bookmarkAdd, { account, ticket, name })
  return (data: BookmarkAddResponse | ErrorResponse)
}

export async function removeBookmark (account: string, ticket: string, name: CharacterName): Promise {
  const {data} = await http.post(endpoints.bookmarkAdd, { account, ticket, name })
  return (data: BookmarkRemoveResponse | ErrorResponse)
}

export function getProfileURL (name: string) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://www.f-list.net/c/${encoded}`
}

export function getAvatarURL (name: string) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://static.f-list.net/images/avatar/${encoded}.png`
}
