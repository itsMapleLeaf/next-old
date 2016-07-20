import Vue from 'vue'
import Vuex from 'vuex'

import Character from '../../types/Character'
import ChatMessage from '../../types/ChatMessage'
import ChannelInfo from '../../types/ChannelInfo'
import ChannelState from '../../types/ChannelState'

import type {Gender, Status} from '../../types/Character'
import type {MessageType} from '../../types/ChatMessage'

type CharacterName = string
type ChannelID = string
type CharacterMap = { [name: CharacterName]: Character }
type CharacterBoolMap = { [name: CharacterName]: boolean }
type FriendMap = { [them: CharacterName]: CharacterName[] }
type ChannelInfoMap = { [id: ChannelID]: ChannelInfo }
type CharacterBatchEntry = [CharacterName, Gender, Status, string]
// type ChannelStateMap = { [id: ChannelID]: ChannelState }
// type PrivateChatStateMap = { [partner: CharacterName]: PrivateChatState }
// type ServerVariableValue = number | string | string[]
type FriendInfo = { you: CharacterName, them: CharacterName }

type ConnectionState
  = 'offline'
  | 'connecting'
  | 'online'
  | 'identified'

const state = {
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

    characters: {}, // name => char: Character
    friends: {},    // name => isFriend: boolean
    bookmarks: {},  // name => isBookmarked: boolean
    ignored: {},    // name => isIgnored: boolean
    admins: {},     // name => isAdmin: boolean

    publicChannels: {},  // id => ChannelInfo
    privateChannels: {}, // id => ChannelInfo
    allChannels: {},     // combination of above

    activeChannels: [], // ChannelID[]
    channelState: {},   // id => ChannelState

    activePrivateChats: [], // CharacterNamep[]
    privateMessages: {},    // partner => messages: ChatMessage[]

    serverVariables: {},
    newPrivateMessage: {}
  },

  ui: {
    overlays: [],
    focusedCharacter: null,
    newNotice: null,
    loadingMessage: ''
  }
}

const mutations = {
  SetAuth (state, account: string, ticket: string) {
    state.auth.account = account
    state.auth.ticket = ticket
  },

  SetUserCharacter (state, name: CharacterName) {
    state.user.character = name
  },

  SetUserCharacterList (state, list: CharacterName[]) {
    state.user.characterList = list.slice().sort()
  },

  SetUserStatus (state, status: Status, message: string) {
    state.user.status = status
    state.user.statusMessage = message
  },

  SetFriendsList (state, friends: FriendInfo[]) {
    const map = {}
    for (let {you, them} of friends) {
      map[them] = map[them] || []
      map[them].push(you)
    }
    state.chat.friends = (map: FriendMap)
  },

  SetBookmarkList (state, bookmarks: CharacterName[]) {
    const map = {}
    for (let name of bookmarks) { map[name] = true }
    state.chat.bookmarks = (map: CharacterBoolMap)
  },

  AddBookmark (state, char: CharacterName) {
    Vue.set(state.chat.bookmarks, char, true)
  },

  RemoveBookmark (state, char: CharacterName) {
    Vue.delete(state.chat.bookmarks, char)
  },

  SetIgnoreList (state, ignored: CharacterName[]) {
    const map = {}
    for (let name of ignored) { map[name] = true }
    state.chat.ignored = (map: CharacterBoolMap)
  },

  AddIgnoredCharacter (state, char: CharacterName) {
    Vue.set(state.chat.ignored, char, true)
  },

  RemoveIgnoredCharacter (state, char: CharacterName) {
    Vue.delete(state.chat.ignored, char)
  },

  SetAdminList (state, admins: CharacterName[]) {
    const map = {}
    for (let name of admins) { map[name] = true }
    state.chat.admins = (map: CharacterBoolMap)
  },

  SetServerVariable (state, key: string, value: number | string | string[]) {
    Vue.set(state.chat.serverVariables, key, value)
  },

  SetConnectionState (state, conn: ConnectionState) {
    state.chat.connectionState = conn
  },

  AddCharacterBatch (state, batch: CharacterBatchEntry[]) {
    const map = {}
    for (let entry of batch) {
      const [name, gender, status, statusmsg] = entry
      const char = new Character(name, gender, status, statusmsg)
      char.onlineSince = Date.now() // not 100% accurate, but works well enough
      map[name] = char
    }
    state.chat.characters = Object.assign(state.chat.characters, (map: CharacterMap))
  },

  AddCharacter (state, name: CharacterName, gender: Gender) {
    const char = new Character(name, gender)
    Vue.set(state.chat.characters, name, char)
    char.onlineSince = Date.now()
  },

  RemoveCharacter (state, name: CharacterName) {
    const char = state.chat.characters[name]
    Vue.delete(state.chat.characters, name)
    for (let channel of Object.values(state.chat.channelState)) {
      channel.characters.$remove(char)
    }
  },

  SetCharacterStatus (state, name: CharacterName, status: Status, message: string) {
    state.chat.characters[name].setStatus(status, message)
  },

  SetFocusedCharacter (state, name: CharacterName) {
    const char: Character = state.chat.characters[name] || new Character(name, 'None', 'offline')
    state.ui.focusedCharacter = char
  },

  SetPublicChannelList (state, channels: ChannelInfo[]) {
    const map = {}
    for (let info of channels) { map[info.id] = info }
    state.chat.publicChannels = (map: ChannelInfoMap)
  },

  SetPrivateChannelList (state, channels: ChannelInfo[]) {
    const map = {}
    for (let info of channels) { map[info.id] = info }
    state.chat.privateChannels = (map: ChannelInfoMap)
  },

  AddActiveChannel (state, id: ChannelID, name: string) {
    state.chat.activeChannels.push(id)
    Vue.set(state.chat.channelState, id, new ChannelState(id, name))
  },

  RemoveActiveChannel (state, id: ChannelID) {
    state.chat.activeChannels.$remove(id)
  },

  SetChannelCharacterList (state, id: ChannelID, characters: CharacterName[]) {
    const charlist: Character[] = characters
      .map(name => state.chat.characters[name])
      .filter(char => char != null)

    state.chat.channelState[id].characters = charlist
  },

  // SetChannelMode (state, id: ChannelID, mode: ChannelMode) {
  //   state.chat.activeChannels[id].mode = mode
  // },

  SetChannelDescription (state, id: ChannelID, description: string) {
    state.chat.channelState[id].description = description
  },

  AddChannelCharacter (state, id: ChannelID, name: CharacterName) {
    const char = state.chat.characters[name]
    state.chat.channelState[id].characters.push(char)
  },

  RemoveChannelCharacter (state, id: ChannelID, name: CharacterName) {
    const char = state.chat.characters[name]
    state.chat.channelState[id].characters.$remove(char)
  },

  AddChannelMessage (state, id: ChannelID, sender: CharacterName, text: string, type: MessageType) {
    const char = state.chat.characters[sender]
    state.chat.channelState[id].addMessage(new ChatMessage(char, text, type))
  },

  AddActivePrivateChat (state, partner: CharacterName) {
    const chats = state.chat.activePrivateChats
    if (!chats.includes(partner)) {
      chats.push(partner)
    }
  },

  RemoveActivePrivateChat (state, partner: CharacterName) {
    state.chat.activePrivateChats.$remove(partner)
  },

  AddPrivateChatMessage (state, partner: CharacterName, sender: CharacterName, text: string) {
    const char = state.chat.characters[sender]
    const message = new ChatMessage(char, text, 'normal')
    if (!state.chat.privateMessages[partner]) {
      Vue.set(state.chat.privateMessages, partner, [message])
    } else {
      state.chat.privateMessages[partner].push(message)
    }
  },

  PushOverlay (state, overlay: string) {
    state.ui.overlays.push(overlay)
  },

  PopOverlay (state) {
    state.ui.overlays.pop()
  },

  SetNewNotice (state, text: string) {
    state.ui.newNotice = { text }
  },

  SetNewPrivateMessage (state, sender: CharacterName, message: string) {
    const char: Character = state.chat.characters[sender]
    state.chat.newPrivateMessage = { sender: char, message }
  },

  SetLoadingMessage (state, message: string) {
    state.ui.loadingMessage = message
  }
}

Vue.use(Vuex)

export default new Vuex.Store({ state, mutations })
