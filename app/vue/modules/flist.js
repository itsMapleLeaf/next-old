import {http} from 'vue'

type CharacterName = string
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

export function authenticate (account: string, password: string) {
  return http.post(endpoints.login, { account, password }).then(res => {
    return (res.data: AuthResponse | ErrorResponse)
  })
}

export function getUserCharacters (account: string, ticket: string) {
  return http.post(endpoints.characterList, { account, ticket }).then(res => {
    return (res.data: CharacterListResponse | ErrorResponse)
  })
}

export function getFriendsList (account: string, ticket: string) {
  return http.post(endpoints.friendsList, { account, ticket }).then(res => {
    return (res.data: FriendsListResponse | ErrorResponse)
  })
}

export function getBookmarkList (account: string, ticket: string) {
  return http.post(endpoints.bookmarkList, { account, ticket }).then(res => {
    return (res.data: BookmarksListResponse | ErrorResponse)
  })
}

export function addBookmark (account: string, ticket: string, name: CharacterName) {
  return http.post(endpoints.bookmarkAdd, { account, ticket, name }).then(res => {
    return (res.data: BookmarkAddResponse | ErrorResponse)
  })
}

export function removeBookmark (account: string, ticket: string, name: CharacterName) {
  return http.post(endpoints.bookmarkAdd, { account, ticket, name }).then(res => {
    return (res.data: BookmarkRemoveResponse | ErrorResponse)
  })
}

export function getProfileURL (name: string) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://www.f-list.net/c/${encoded}`
}

export function getAvatarURL (name: string) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://static.f-list.net/images/avatar/${encoded}.png`
}
