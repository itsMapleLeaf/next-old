import Vue from 'vue'
import Vuex from 'vuex'

import Character from '../../types/Character'
import ChannelState from '../../types/ChannelState'
import ChatMessage from '../../types/ChatMessage'
import PrivateChatState from '../../types/PrivateChatState'
import ChannelInfo from '../../types/ChannelInfo'

import type {Gender, Status} from '../../types/Character'
import type {MessageType} from '../../types/ChatMessage'

type CharacterName = string
type ChannelID = string
type CharacterMap = { [name: CharacterName]: Character }
type CharacterBoolMap = { [name: CharacterName]: boolean }
type FriendMap = { [them: CharacterName]: CharacterName[] }
type ChannelInfoMap = { [id: ChannelID]: ChannelInfo }
type CharacterBatchEntry = [CharacterName, Gender, Status, string]
type ChannelStateMap = { [id: ChannelID]: ChannelState }
type PrivateChatStateMap = { [partner: CharacterName]: PrivateChatState }
type ServerVariableValue = number | string | string[]
type FriendInfo = { you: CharacterName, them: CharacterName }

type ConnectionState
  = 'offline'
  | 'connecting'
  | 'online'
  | 'identified'

type State = {
  auth: { account: string, ticket: string },

  user: {
    character: CharacterName,
    characterList: CharacterName[],
    status: Status,
    statusMessage: string
  },

  chat: {
    connectionState: ConnectionState,
    connectionError: string,

    characters: CharacterMap,
    friends: FriendMap,
    bookmarks: CharacterBoolMap,
    ignored: CharacterBoolMap,
    admins: CharacterBoolMap,

    // TODO: combine these
    publicChannels: ChannelInfoMap,
    privateChannels: ChannelInfoMap,

    activeChannels: ChannelStateMap,
    activePrivateChats: PrivateChatStateMap,
    serverVariables: { [key: string]: ServerVariableValue }
  },

  ui: {
    overlays: string[]
  }
}

const state: State = {
  auth: { account: '', ticket: '' },

  user: {
    character: '',
    characterList: [],
    status: 'online',
    statusMessage: ''
  },

  chat: {
    connectionState: 'offline',
    connectionError: '',
    characters: {},
    friends: {},
    bookmarks: {},
    ignored: {},
    admins: {},
    publicChannels: {},
    privateChannels: {},
    activeChannels: {},
    activePrivateChats: {},
    serverVariables: {}
  },

  ui: {
    overlays: []
  }
}

const mutations = {
  SetAuth (state: State, account: string, ticket: string) {
    state.auth.account = account
    state.auth.ticket = ticket
  },

  SetUserCharacter (state: State, name: CharacterName) {
    state.user.character = name
  },

  SetUserCharacterList (state: State, list: CharacterName[]) {
    state.user.characterList = list
  },

  SetFriendsList (state: State, friends: FriendInfo[]) {
    const map: FriendMap = {}
    for (let {you, them} of friends) {
      map[them] = map[them] || []
      map[them].push(you)
    }
    state.chat.friends = map
  },

  SetBookmarkList (state: State, bookmarks: CharacterName[]) {
    const map: CharacterBoolMap = {}
    for (let name of bookmarks) { map[name] = true }
    state.chat.bookmarks = map
  },

  SetIgnoreList (state: State, ignored: CharacterName[]) {
    const map: CharacterBoolMap = {}
    for (let name of ignored) { map[name] = true }
    state.chat.ignored = map
  },

  SetAdminList (state: State, admins: CharacterName[]) {
    const map: CharacterBoolMap = {}
    for (let name of admins) { map[name] = true }
    state.chat.admins = map
  },

  SetServerVariable (state: State, key: string, value: number | string | string[]) {
    Vue.set(state.chat.serverVariables, key, value)
  },

  SetConnectionState (state: State, conn: ConnectionState) {
    state.chat.connectionState = conn
  },

  AddCharacterBatch (state: State, batch: CharacterBatchEntry[]) {
    const map: CharacterMap = {}
    for (let entry of batch) {
      const [name, gender, status, statusmsg] = entry
      const char: Character = new Character(name, gender, status, statusmsg)
      map[name] = char
    }
    state.chat.characters = Object.assign(state.chat.characters, map)
  },

  AddCharacter (state: State, name: CharacterName, gender: Gender) {
    Vue.set(state.chat.characters, name, new Character(name, gender))
  },

  RemoveCharacter (state: State, name: CharacterName) {
    delete state.chat.characters[name]
  },

  SetCharacterStatus (state: State, name: CharacterName, status: Status, message: string) {
    state.chat.characters[name].setStatus(status, message)
  },

  SetPublicChannelList (state: State, channels: ChannelInfo[]) {
    const map: ChannelInfoMap = {}
    for (let info of channels) { map[info.id] = info }
    state.chat.publicChannels = map
  },

  SetPrivateChannelList (state: State, channels: ChannelInfo[]) {
    const map: ChannelInfoMap = {}
    for (let info of channels) { map[info.id] = info }
    state.chat.privateChannels = map
  },

  AddActiveChannel (state: State, id: ChannelID, name: string) {
    Vue.set(state.chat.activeChannels, id, new ChannelState(id, name))
  },

  RemoveActiveChannel (state: State, id: ChannelID) {
    Vue.set(state.chat.activeChannels, id, undefined)
    delete state.chat.activeChannels[id]
  },

  SetChannelCharacterList (state: State, id: ChannelID, characters: CharacterName[]) {
    const list: Character[] = characters
      .map(name => state.chat.characters[name])
      .filter(char => char != null)

    state.chat.activeChannels[id].characters = list
  },

  // SetChannelMode (state: State, id: ChannelID, mode: ChannelMode) {
  //   state.chat.activeChannels[id].mode = mode
  // },

  SetChannelDescription (state: State, id: ChannelID, description: string) {
    state.chat.activeChannels[id].description = description
  },

  AddChannelCharacter (state: State, id: ChannelID, name: CharacterName) {
    const char: Character = state.chat.characters[name]
    state.chat.activeChannels[id].characters.push(char)
  },

  RemoveChannelCharacter (state: State, id: ChannelID, name: CharacterName) {
    const channel: ChannelState = state.chat.activeChannels[id]
    channel.characters = channel.characters.filter(char => char.name !== name)
  },

  AddChannelMessage (state: State, id: ChannelID, sender: CharacterName, text: string, type: MessageType) {
    const channel: ChannelState = state.chat.activeChannels[id]
    const char: Character = state.chat.characters[sender]
    const message: ChatMessage = new ChatMessage(char, text, type)
    channel.messages.push(message)
  },

  AddActivePrivateChat (state: State, partner: CharacterName) {
    const char: Character = state.chat.characters[partner]
    const chat: PrivateChatState = new PrivateChatState(char)
    Vue.set(state.chat.activePrivateChats, partner, chat)
  },

  RemoveActivePrivateChat (state: State, partner: CharacterName) {
    delete state.chat.activePrivateChats[partner]
  },

  AddPrivateChatMessage (state: State, partner: CharacterName, sender: CharacterName, text: string) {
    // TODO: open a private chat if one doesn't exist
    const channel: PrivateChatState = state.chat.activePrivateChats[partner]
    const char: Character = state.chat.characters[sender]
    const message: ChatMessage = new ChatMessage(char, text, 'chat')
    channel.messages.push(message)
  },

  PushOverlay (state: State, overlay: string) {
    state.ui.overlays.push(overlay)
  },

  PopOverlay (state: State) {
    state.ui.overlays.pop()
  }
}

Vue.use(Vuex)

export default new Vuex.Store({ state, mutations })
