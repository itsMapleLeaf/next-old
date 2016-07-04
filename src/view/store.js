import Vue from 'vue'
import type {AppState, Character, CharacterName, FriendInfo, ChannelInfo, ActiveChatState} from './types.new'
import type {Event} from './events.new'

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

  dispatchEvent (event: Event) {
    this.state.event = event
  }

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
}

export default new Store()
