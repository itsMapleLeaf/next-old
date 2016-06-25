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
      return Promise.resolve(data.characters)
    }
  })
}

export function login (account, password) {
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
