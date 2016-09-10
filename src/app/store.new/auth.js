// @flow
import type {Name, Relationship} from '../types'
import state from './state'
import * as flist from '../f-list'

type UserData = {
  characters: Name[],
  friends: Relationship[],
  bookmarks: Name[]
}

export function fetchUserData (account: string, ticket: string): Promise<UserData> {
  return Promise.all([
    flist.getCharacters(account, ticket),
    flist.getFriends(account, ticket),
    flist.getBookmarks(account, ticket)
  ])
  .then(([characters, friends, bookmarks]) => {
    return {characters, friends, bookmarks}
  })
}

export function setAuthInfo (account: string, ticket: string) {
  state.account = account
  state.ticket = ticket
}
