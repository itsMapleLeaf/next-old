import Vue from 'vue'
import {createCharacter} from 'types/character'
import {createChannelState} from 'types/chat'
import type {AppState} from 'types/app'
import type {Character, CharacterName, Gender, CharacterStatusState} from 'types/character'
import type {FriendInfo, ChannelInfo, ChannelID, ChannelState, ChannelMode, ActiveChatState, ChatMessage} from 'types/chat'
import type {Event} from 'types/event'

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

  setServerVariable (key: string, value: string | string[] | number) {
    Vue.set(this.state.chat.serverVariables, key, parseFloat(value))
  }

  // add characters in batch for performance
  addCharacterBatch (batch: (string[])[]) {
    const {characters} = this.state.chat
    batch.forEach(entry => {
      const [name, gender, status, statusMessage] = entry
      const char: Character = createCharacter(name, gender)
      char.status = { state: status, message: statusMessage }
      characters.push(char)
    })
  }

  addCharacter (name: CharacterName, gender: Gender) {
    this.state.chat.characters.push(createCharacter(name, gender))
  }

  removeCharacter (name: CharacterName) {
    const index: number = this.state.chat.characters.findIndex(char => char.name === name)
    this.state.chat.characters.splice(index)
  }

  setCharacterStatus (name: CharacterName, state: CharacterStatusState, message: string) {
    const char: Character = this.getCharacter(name)
    char.status = { state, message }
  }

  setChannelCharacters (id: ChannelID, names: CharacterName[]) {
    const channel: ChannelState = this.getChannelState(id)
    channel.characters = this.state.chat.characters.filter(char => names.includes(char))
  }

  addChannelCharacter (id: ChannelID, name: CharacterName) {
    const channel: ChannelState = this.getChannelState(id)
    const char: Character = this.getCharacter(name)
    channel.characters.push(char)
  }

  removeChannelCharacter (id: ChannelID, name: CharacterName) {
    const channel: ChannelState = this.getChannelState(id)
    const index: number = channel.characters.findIndex(char => char.name === name)
    channel.characters.splice(index)
  }

  setChannelMode (id: ChannelID, mode: ChannelMode) {
    const channel: ChannelState = this.getChannelState(id)
    channel.mode = mode
  }

  setChannelDescription (id: ChannelID, description: string) {
    const channel: ChannelState = this.getChannelState(id)
    channel.description = description
  }

  openChannelChat (id: ChannelID, name: string) {
    const state: ChannelState = createChannelState(id, name)
    this.state.chat.activeChats.push(state)
  }

  closeChannelChat (id: ChannelID) {
    const activeChats: ActiveChatState[] = this.state.chat.activeChats
    const index: number = activeChats.findIndex(chat => chat.type === 'channel' && chat.id === id)
    activeChats.splice(index)
  }

  addChannelMessage (id: ChannelID, message: ChatMessage) {
    const channel: ChannelState = this.getChannelState(id)
    channel.messages.push(message)
  }

  openPrivateChat () {}

  closePrivateChat () {}

  addPrivateMessage () {}

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
