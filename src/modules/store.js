import Vue from 'vue'
import {createCharacter, createChannelState} from 'modules/constructors'
import {
  Character, CharacterName, Gender, CharacterStatus, CharacterRelation,
  FriendInfo, ChannelInfo, ChannelID, ChannelState, ChannelMode, ActiveChatState,
  Event
} from 'modules/types'

type State = { [item: string]: any }

type CharacterHash = { [name: CharacterName]: Character }

type Mutation = { type: 'Init' }
  | { type: 'Event', event: Event }

  | { type: 'Auth', account: string, ticket: string }

  | { type: 'UserCharacter', name: CharacterName }
  | { type: 'UserCharacterList', characters: CharacterName[] }

  | { type: 'FriendsList', friends: FriendInfo[] }
  | { type: 'BookmarkList', bookmarks: CharacterName[] }
  | { type: 'IgnoreList', ignored: CharacterName[] }
  | { type: 'AdminList', admins: CharacterName[] }

  | { type: 'PublicChannelList', channels: ChannelInfo[] }
  | { type: 'PrivateChannelList', channels: ChannelInfo[] }

  | { type: 'ServerVariable', key: string, value: string | string[] | number }

  | { type: 'CharacterBatch', batch: CharacterHash }
  | { type: 'CharacterOnline', name: CharacterName, gender: Gender }
  | { type: 'CharacterOffline', name: CharacterName }
  | { type: 'CharacterStatus', name: CharacterName, status: CharacterStatus }

  | { type: 'ChannelJoined', id: ChannelID, name: string }
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

type Snapshot = {
  state: State,
  mutation: Mutation
}

export class Store {
  state: State
  mutations: Snapshot[]

  constructor () {
    this.state = {
      auth: { account: '', ticket: '' },

      user: {
        character: '',
        characterList: [],
        status: { state: 'online', message: '' }
      },

      chat: {
        characters: {},
        friends: [],
        bookmarks: [],
        ignored: [],
        admins: [],
        publicChannels: [],
        privateChannels: [],
        activeChats: [],
        serverVariables: {}
      }
    }

    this.mutations = [
      { state: Object.assign({}, this.state), mutation: { type: 'Init' } }
    ]

    this.subscriptions = []
  }

  subscribe (callback: (event?: Event) => void) {
    this.subscriptions.push(callback)
  }

  notify (type: string, params?: Object = {}) {
    const event: Event = Object.assign({ type }, params)
    this.subscriptions.forEach(cb => cb(event))
  }

  dispatch (mut) {
    try {
      this.handleMutation(mut)
      this.mutations.push({
        mutation: mut,
        state: this.state
      })
    } catch (err) {
      console.error(err)
      console.log('State:', this.state)
      console.log('Mutation:', mut)
    }
  }

  handleMutation (mut: Mutation) {
    const {auth, user, chat} = this.state
    switch (mut.type) {
      case 'Event':
        this.state.event = mut.event
        break

      case 'Auth':
        auth.account = mut.account
        auth.ticket = mut.ticket
        break

      case 'UserCharacter':
        user.character = mut.name
        break

      case 'UserCharacterList':
        user.characterList = mut.characters
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
        chat.characters = mut.batch
        break

      case 'CharacterOnline': {
        const char: Character = createCharacter(mut.name, mut.gender)
        chat.characters[mut.name] = char
        break
      }

      case 'CharacterOffline':
        delete chat.characters[mut.name]
        break

      case 'CharacterStatus': {
        const char: Character = this.getCharacter(mut.name)
        char.status = mut.status
        break
      }

      case 'ChannelJoined':
        chat.activeChats.push(createChannelState(mut.id, mut.name))
        break

      case 'ChannelLeft':
        chat.activeChats = chat.activeChats.filter(chat => chat.id !== mut.id)
        break

      case 'ChannelCharacterList': {
        const channel = this.getActiveChannel(mut.id)
        if (channel) {
          channel.characters = mut.characters
            .map(name => this.getCharacter(name))
            .filter(char => char != null)
        }
        break
      }

      case 'ChannelMode':
        this.getActiveChannel(mut.id).mode = mut.mode
        break

      case 'ChannelDescription':
        this.getActiveChannel(mut.id).description = mut.description
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

  getUserStatus (): CharacterStatus {
    const char = this.getCharacter(this.getUserCharacterName())
    if (char) {
      return char.status
    } else {
      return { state: 'online', message: '' }
    }
  }

  getPublicChannelList (): ChannelInfo[] {
    return this.state.chat.publicChannels.slice()
  }

  getPrivateChannelList (): ChannelInfo[] {
    return this.state.chat.privateChannels.slice()
  }

  getOnlineCharacters (): CharacterHash {
    return Object.assign({}, this.state.chat.characters)
  }

  getOnlineCharacterList (): Object[] {
    return Object.values(this.state.chat.characters)
  }

  getCharacter (name: CharacterName): ?Character {
    return this.state.chat.characters[name]
  }

  getActiveChats (): ActiveChatState[] {
    return this.state.chat.activeChats
  }

  getActiveChannel (id: ChannelID): ?ChannelState {
    return this.state.chat.activeChats
      .find(chat => chat.type === 'channel' && chat.id === id)
  }

  isChannelActive (id: ChannelID): boolean {
    return this.getActiveChannel(id) != null
  }

  getFriendship (name: CharacterName): ?CharacterName {
    const entry = this.state.chat.friends.find(info => info.them === name)
    if (entry) {
      return entry.you
    }
  }

  isBookmarked (name: CharacterName): boolean {
    return this.state.chat.bookmarks.includes(name)
  }

  isAdmin (name: CharacterName): boolean {
    return this.state.chat.admins.includes(name)
  }

  isIgnored (name: CharacterName): boolean {
    return this.state.chat.ignored.includes(name)
  }

  getCharacterRelation (char: Character): CharacterRelation[] {
    const relation = []
    if (this.getFriendship(char.name) != null) {
      relation.push('friend')
    }
    if (this.isBookmarked(char.name)) {
      relation.push('bookmark')
    }
    if (this.isAdmin(char.name)) {
      relation.push('admin')
    }
    if (this.isIgnored(char.name)) {
      relation.push('ignored')
    }
    if (char.status.state === 'looking') {
      relation.push('looking')
    }
    return relation
  }
}

export const store = new Store()
export const state = store.state
