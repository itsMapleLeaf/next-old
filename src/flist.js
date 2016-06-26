import {http} from 'vue'

const endpoints = {
  login: 'https://www.f-list.net/json/getApiTicket.php',
  characterList: 'https://www.f-list.net/json/api/character-list.php',
  friendsList: 'https://www.f-list.net/json/api/friend-list.php',
  bookmarkList: 'https://www.f-list.net/json/api/bookmark-list.php'
}

function resolvePromise (promise) {
  return promise
  .then(({ data }) => {
    if (data.error) {
      return Promise.reject(data.error)
    } else {
      return Promise.resolve(data)
    }
  })
}

export function sendLoginRequest (account, password) {
  return resolvePromise(http.post(endpoints.login, { account, password }))
}

export function getCharacterList (account, ticket) {
  return resolvePromise(http.post(endpoints.characterList, { account, ticket }))
}

export function getFriendsList (account, ticket) {
  return resolvePromise(http.post(endpoints.friendsList, { account, ticket }))
}

export function getBookmarkList (account, ticket) {
  return resolvePromise(http.post(endpoints.bookmarkList, { account, ticket }))
}

export function getUserData (account, ticket) {
  const data = {}
  return getCharacterList(account, ticket)
  .then(({characters}) => {
    data.characters = characters
    return getFriendsList(account, ticket)
  })
  .then(({characters}) => {
    data.friends = characters
    return getBookmarkList(account, ticket)
  })
  .then(({characters}) => {
    data.bookmarks = characters
    return Promise.resolve(data)
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
