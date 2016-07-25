import {http} from 'vue'

const endpoints = {
  login: 'https://www.f-list.net/json/getApiTicket.php',
  characterList: 'https://www.f-list.net/json/api/character-list.php',
  friendList: 'https://www.f-list.net/json/api/friend-list.php',
  bookmarkList: 'https://www.f-list.net/json/api/bookmark-list.php',
  bookmarkAdd: 'https://www.f-list.net/json/api/bookmark-add.php',
  bookmarkRemove: 'https://www.f-list.net/json/api/bookmark-remove.php'
}

function post (url, data) {
  return http.post(url, data).then(res => {
    const data = JSON.parse(res.data)
    if (data.error) throw new Error(data.error)
    return data
  })
}

export function getTicket (account, password) {
  return post(endpoints.login, { account, password }).then(data => {
    return data.ticket
  })
}

export function getCharacters (account, ticket) {
  return post(endpoints.characterList, { account, ticket }).then(data => {
    return data.characters
  })
}

export function getFriends (account, ticket) {
  return post(endpoints.friendList, { account, ticket }).then(data => {
    console.log(data)
    return data.friends.map(entry => ({ you: entry.source, them: entry.dest }))
  })
}

export function getBookmarks (account, ticket) {
  return post(endpoints.bookmarkList, { account, ticket }).then(data => {
    return data.characters
  })
}

export function getProfileURL (name) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://www.f-list.net/c/${encoded}`
}

export function getAvatarURL (name) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://static.f-list.net/images/avatar/${encoded}.png`
}
