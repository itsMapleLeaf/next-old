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

    publicChannels: ChannelInfoMap,
    privateChannels: ChannelInfoMap,

    activeChannels: ChannelStateMap,
    activePrivateChats: PrivateChatStateMap,
    serverVariables: { [key: string]: ServerVariableValue },

    joinedChannel: ?{ id: ChannelID },
    leftChannel: ?{ id: ChannelID },

    newPrivateMessage: ?{ sender: Character, message: string }
  },

  ui: {
    overlays: string[],
    focusedCharacter: Character | null,
    newNotice: ?{ text: string }
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
    serverVariables: {},
    newPrivateMessage: null,
    joinedChannel: null,
    leftChannel: null
  },

  ui: {
    overlays: [],
    focusedCharacter: null,
    newNotice: null
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

  AddBookmark (state: State, char: CharacterName) {
    Vue.set(state.chat.bookmarks, char, true)
  },

  RemoveBookmark (state: State, char: CharacterName) {
    Vue.set(state.chat.bookmarks, char, undefined)
    delete state.chat.bookmarks[char]
  },

  SetIgnoreList (state: State, ignored: CharacterName[]) {
    const map: CharacterBoolMap = {}
    for (let name of ignored) { map[name] = true }
    state.chat.ignored = map
  },

  AddIgnoredCharacter (state: State, char: CharacterName) {
    Vue.set(state.chat.ignored, char, true)
  },

  RemoveIgnoredCharacter (state: State, char: CharacterName) {
    Vue.set(state.chat.ignored, char, undefined)
    delete state.chat.ignored[char]
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
      char.onlineSince = Date.now() // not 100% accurate, but works well enough
      map[name] = char
    }
    state.chat.characters = Object.assign(state.chat.characters, map)
  },

  AddCharacter (state: State, name: CharacterName, gender: Gender) {
    const char = new Character(name, gender)
    Vue.set(state.chat.characters, name, char)
    char.onlineSince = Date.now()
  },

  RemoveCharacter (state: State, name: CharacterName) {
    Vue.delete(state.chat.characters, name)
    for (let id in state.activeChannels) {
      const channel = state.activeChannels[id]
      channel.characters = channel.characters.filter(char => char.name !== name)
    }
  },

  SetCharacterStatus (state: State, name: CharacterName, status: Status, message: string) {
    state.chat.characters[name].setStatus(status, message)
  },

  SetFocusedCharacter (state: State, name: CharacterName) {
    state.ui.focusedCharacter = state.chat.characters[name] || new Character(name, 'None', 'offline')
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
    const channel = new ChannelState(id, name)
    Vue.set(state.chat.activeChannels, id, channel)
    state.chat.joinedChannel = { id }
  },

  RemoveActiveChannel (state: State, id: ChannelID) {
    Vue.delete(state.chat.activeChannels, id)
    state.chat.leftChannel = { id }
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
    // TODO: limit channel message lists to ~500 chats
  },

  AddActivePrivateChat (state: State, partner: CharacterName) {
    const char: Character = state.chat.characters[partner]
    const chat: PrivateChatState = new PrivateChatState(char)
    Vue.set(state.chat.activePrivateChats, partner, chat)
  },

  RemoveActivePrivateChat (state: State, partner: CharacterName) {
    Vue.set(state.chat.activePrivateChats, partner)
  },

  AddPrivateChatMessage (state: State, partner: CharacterName, sender: CharacterName, text: string) {
    const chat: PrivateChatState = state.chat.activePrivateChats[partner]
    const char: Character = state.chat.characters[sender]
    const message: ChatMessage = new ChatMessage(char, text, 'normal')
    chat.messages.push(message)
  },

  PushOverlay (state: State, overlay: string) {
    state.ui.overlays.push(overlay)
  },

  PopOverlay (state: State) {
    state.ui.overlays.pop()
  },

  SetNewPrivateMessage (state: State, sender: CharacterName, message: string) {
    state.chat.newPrivateMessage = { sender: state.chat.characters[sender], message }
  },

  SetNewNotice (state: State, text: string) {
    state.ui.newNotice = { text }
  }
}

Vue.use(Vuex)

export default new Vuex.Store({ state, mutations })
