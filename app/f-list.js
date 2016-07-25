import {http} from 'vue'

export const endpoints = {
  login: 'https://www.f-list.net/json/getApiTicket.php',
  characterList: 'https://www.f-list.net/json/api/character-list.php',
  friendsList: 'https://www.f-list.net/json/api/friend-list.php',
  bookmarkList: 'https://www.f-list.net/json/api/bookmark-list.php',
  bookmarkAdd: 'https://www.f-list.net/json/api/bookmark-add.php',
  bookmarkRemove: 'https://www.f-list.net/json/api/bookmark-remove.php'
}

export function getProfileURL (name) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://www.f-list.net/c/${encoded}`
}

export function getAvatarURL (name) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://static.f-list.net/images/avatar/${encoded}.png`
}
