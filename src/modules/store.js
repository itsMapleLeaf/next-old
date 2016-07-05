import Vue from 'vue'
import type {AppState} from 'types/app'
import type {Character, CharacterName} from 'types/character'
import type {FriendInfo, ChannelInfo, ActiveChatState} from 'types/chat'
import type {Event} from 'types/event'

class Store {
  state: AppState

  constructor () {
    this.state = {
      auth: { account: '', ticket: '' },

      user: {
        character: '',
        characterList: [],
        status: { state: 'online', message: '' }
      },

      chat: {
        characters: [],
        friends: [],
        bookmarks: [],
        ignored: [],
        admins: [],
        publicChannels: [],
        privateChannels: [],
        activeChats: [],
        serverVariables: {}
      },

      event: {}
    }
  }

  // convenience event dispatcher
  dispatch (type: string, params?: Object = {}) {
    const event: Event = Object.assign({ type }, params)
    this.state.event = event
  }

  // setters
  setAuthData (account: string, ticket: string) {
    this.state.auth.account = account
    this.state.auth.ticket = ticket
  }

  setUserCharacter (character: CharacterName) {
    this.state.user.character = character
  }

  setUserCharacterList (list: CharacterName[]) {
    this.state.user.characterList = list
  }

  setOnlineCharacterList (list: Character[]) {
    this.state.chat.characters = list
  }

  setFriendsList (friends: FriendInfo[]) {
    this.state.chat.friends = friends
  }

  setBookmarkList (bookmarks: CharacterName[]) {
    this.state.chat.bookmarks = bookmarks
  }

  setIgnoreList (ignored: CharacterName[]) {
    this.state.chat.ignored = ignored
  }

  setAdminList (admins: CharacterName[]) {
    this.state.chat.admins = admins
  }

  setPublicChannelList (channels: ChannelInfo[]) {
    this.state.chat.publicChannels = channels
  }

  setPrivateChannelList (channels: ChannelInfo[]) {
    this.state.chat.publicChannels = channels
  }

  setActiveChats (chats: ActiveChatState[]) {
    this.state.chat.activeChats = chats
  }

  setServerVariable (key: string, value: number) {
    Vue.set(this.state.chat.serverVariables, key, value)
  }

  // getters
  getAuthData (): {account: string, ticket: string} {
    return Object.assign({}, this.state.auth)
  }

  getUserCharacters (): CharacterName[] {
    return this.state.user.characterList.slice()
  }

  getUserCharacterName (): CharacterName {
    return this.state.user.character
  }
}

export const store = new Store()
export const state = store.state
export const dispatch = store.dispatch.bind(store)
