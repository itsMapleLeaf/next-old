import Vue from 'vue'
import {createCharacter} from 'types/character'
// import {createChannelState} from 'types/chat'
import type {AppState} from 'types/app'
import type {Character, CharacterName, Gender, CharacterStatus} from 'types/character'
import type {FriendInfo, ChannelInfo, ChannelID, ChannelState, ChannelMode, ActiveChatState, ChatMessage} from 'types/chat'
import type {Event} from 'types/event'

type StoreMutation
  = { type: 'Auth', account: string, ticket: string }

  | { type: 'UserCharacter', name: CharacterName }
  | { type: 'UserCharacterList', list: CharacterName[] }

  | { type: 'FriendsList', friends: FriendInfo[] }
  | { type: 'BookmarkList', bookmarks: CharacterName[] }
  | { type: 'IgnoreList', ignored: CharacterName[] }
  | { type: 'AdminList', admins: CharacterName[] }

  | { type: 'PublicChannelList', channels: ChannelInfo[] }
  | { type: 'PrivateChannelList', channels: ChannelInfo[] }

  | { type: 'ServerVariable', key: string, value: string | string[] | number }

  | { type: 'CharacterBatch', batch: (string[])[] }
  | { type: 'CharacterOnline', name: CharacterName, gender: Gender }
  | { type: 'CharacterOffline', name: CharacterName }
  | { type: 'CharacterStatus', name: CharacterName, status: CharacterStatus }

  | { type: 'ChannelJoined', id: ChannelID }
  | { type: 'ChannelLeft', id: ChannelID }
  | { type: 'ChannelCharacterList', id: ChannelID, characters: CharacterName[] }
  | { type: 'ChannelMode', id: ChannelID, mode: ChannelMode }
  | { type: 'ChannelDescription', id: ChannelID, description: string }
  | { type: 'ChannelCharacterJoined', id: ChannelID, name: CharacterName }
  | { type: 'ChannelCharacterLeft', id: ChannelID, name: CharacterName }
  | { type: 'ChannelMessage', id: ChannelID, sender: CharacterName, message: string }

  | { type: 'PrivateChatOpened', partner: CharacterName }
  | { type: 'PrivateChatClosed', partner: CharacterName }
  | { type: 'PrivateChatMessage', partner: CharacterName, sender: CharacterName, message: string }

export class Store {
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

  dispatch (mut: StoreMutation) {
    const {auth, user, chat} = this.state
    switch (mut.type) {
      case 'Auth':
        auth.account = mut.account
        auth.ticket = mut.ticket
        break

      case 'UserCharacter':
        user.character = mut.name
        break

      case 'UserCharacterList':
        user.characterList = mut.list
        break

      case 'FriendsList':
        chat.friends = mut.friends
        break

      case 'BookmarkList':
        chat.bookmarks = mut.bookmarks
        break

      case 'IgnoreList':
        chat.ignored = mut.ignored
        break

      case 'AdminList':
        chat.admins = mut.admins
        break

      case 'PublicChannelList':
        chat.publicChannels = mut.channels
        break

      case 'PrivateChannelList':
        chat.privateChannels = mut.channels
        break

      case 'ServerVariable':
        Vue.set(chat.serverVariables, mut.key, mut.value)
        break

      case 'CharacterBatch':
        for (let [name, gender, state, message] in mut.batch) {
          const status: CharacterStatus = { state, message }
          const char: Character = createCharacter(name, gender, status)
          chat.characters.push(char)
        }
        break

      case 'CharacterOnline': {
        const char: Character = createCharacter(mut.name, mut.gender)
        chat.characters.push(char)
        break
      }

      case 'CharacterOffline':
        chat.characters = chat.characters.filter(char => char.name !== mut.name)
        break

      case 'CharacterStatus': {
        const char: Character = this.getCharacter(mut.name)
        char.status = mut.status
        break
      }

      case 'ChannelJoined':
        break

      case 'ChannelLeft':
        break

      case 'ChannelCharacterList':
        break

      case 'ChannelMode':
        break

      case 'ChannelDescription':
        break

      case 'ChannelCharacterJoined':
        break

      case 'ChannelCharacterLeft':
        break

      case 'ChannelMessage':
        break

      case 'PrivateChatOpened':
        break

      case 'PrivateChatClosed':
        break

      case 'PrivateChatMessage':
        break

    }
  }

  // getters
  getEvent ():Event {
    return this.state.event
  }

  getAuthData (): {account: string, ticket: string} {
    return Object.assign({}, this.state.auth)
  }

  getUserCharacters (): CharacterName[] {
    return this.state.user.characterList.slice()
  }

  getUserCharacterName (): CharacterName {
    return this.state.user.character
  }

  getOnlineCharacters (): Character[] {
    return this.state.chat.characters
  }

  getCharacter (name: CharacterName): Character {
    return this.state.chat.characters
      .find(char => char.name === name)
  }

  getChannelState (id: ChannelID): ChannelState {
    return this.state.chat.activeChats
      .find(chat => chat.type === 'channel' && chat.id === id)
  }
}

export const store = new Store()
