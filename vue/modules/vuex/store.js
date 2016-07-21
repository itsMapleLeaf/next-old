import Vue from 'vue'
import Vuex from 'vuex'

import Character from '../../types/Character'
import ChatMessage from '../../types/ChatMessage'
import ChannelInfo from '../../types/ChannelInfo'
import ChannelState from '../../types/ChannelState'
import PrivateChatState from '../../types/PrivateChatState'

import type {Gender, Status} from '../../types/Character'
import type {MessageType} from '../../types/ChatMessage'

type CharacterName = string
type ChannelID = string
type ServerVariable = number | string | string[]
type FriendInfo = { you: CharacterName, them: CharacterName }
type CharacterBatchEntry = [CharacterName, Gender, Status, string]

type CharacterMap = Map<CharacterName, Character>
type CharacterBoolMap = Map<CharacterName, boolean>
type ChannelInfoMap = Map<ChannelID, ChannelInfo>
type FriendMap = Map<CharacterName, Character[]>
type ChannelStateMap = Map<ChannelID, ChannelState>
type PrivateChatMap = Map<CharacterName, PrivateChatState>

type ConnectionState
  = 'offline'
  | 'connecting'
  | 'online'
  | 'identified'

class Map<to, what> {
  items: { [key: to]: what }

  constructor (items = {}) {
    this.items = items
  }

  get (key: to) { return this.items[key] }
  set (key: to, value: what) { return (this.items[key] = value) }
  delete (key: to) { delete this.items[key] }

  keys () { return Object.keys(this.items) }
  values () { return Object.values(this.items) }

  combine (other: Map<to, what>) {
    const items = Object.assign({}, this.items, other.items)
    return new Map(items)
  }
}

class AuthState {
  account: string = ''
  ticket: string = ''
}

class UserState {
  character: CharacterName = ''
  characterList: CharacterName[] = []
  status: Status = 'online'
  statusMessage: string = ''
}

class ChatState {
  connectionState: ConnectionState = 'offline'
  connectionError: string = ''

  characters: CharacterMap = new Map()
  friends: FriendMap = new Map()
  bookmarks: CharacterBoolMap = new Map()
  ignored: CharacterBoolMap = new Map()
  admins: CharacterBoolMap = new Map()

  channels: { [type: string]: ChannelInfoMap } = {
    public: new Map(),
    private: new Map()
  }

  activeChannels: ChannelID[] = []
  channelState: ChannelStateMap = new Map()

  activePrivateChats: CharacterName[] = []
  privateMessages: PrivateChatMap = new Map()

  serverVariables: { [key: string]: ServerVariable } = {}
  newPrivateMessage: ChatMessage
}

class UIState {
  overlays: string[] = []
  focusedCharacter: CharacterName
  newNotice: { text: string }
  loadingMessage: string = ''
}

// TODO: reinstate usage of PrivateChatState
const state = {
  auth: new AuthState(),
  user: new UserState(),
  chat: new ChatState(),
  ui: new UIState()
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
    const map: FriendMap = new Map()
    for (let {you, them} of friends) {
      map.get(them) || map.set(them, [])
      map.get(them).push(you)
    }
    state.chat.friends = map
  },

  SetBookmarkList (state, bookmarks: CharacterName[]) {
    const map: CharacterBoolMap = new Map()
    for (let name of bookmarks) { map.set(name, true) }
    state.chat.bookmarks = map
  },

  AddBookmark (state, char: CharacterName) {
    state.chat.bookmarks.set(char, true)
  },

  RemoveBookmark (state, char: CharacterName) {
    state.chat.bookmarks.delete(char)
  },

  SetIgnoreList (state, ignored: CharacterName[]) {
    const map: CharacterBoolMap = new Map()
    for (let name of ignored) { map.set(name, true) }
    state.chat.ignored = map
  },

  AddIgnoredCharacter (state, char: CharacterName) {
    state.chat.ignored.set(char, true)
  },

  RemoveIgnoredCharacter (state, char: CharacterName) {
    state.chat.ignored.delete(char)
  },

  SetAdminList (state, admins: CharacterName[]) {
    const map: CharacterBoolMap = new Map()
    for (let name of admins) { map.set(name, true) }
    state.chat.admins = (map: CharacterBoolMap)
  },

  SetServerVariable (state, key: string, value: number | string | string[]) {
    state.chat.serverVariables[key] = value
  },

  SetConnectionState (state, conn: ConnectionState) {
    state.chat.connectionState = conn
  },

  AddCharacterBatch (state, batch: CharacterBatchEntry[]) {
    const map: CharacterMap = new Map()
    for (let entry of batch) {
      const [name, gender, status, statusmsg] = entry
      const char = new Character(name, gender, status, statusmsg)
      char.onlineSince = Date.now() // not 100% accurate, but works well enough
      map.set(name, char)
    }
    state.chat.characters = state.chat.characters.combine(map)
  },

  AddCharacter (state, name: CharacterName, gender: Gender) {
    const char = new Character(name, gender)
    state.chat.characters.set(name, char)
    char.onlineSince = Date.now()
  },

  RemoveCharacter (state, name: CharacterName) {
    const char = state.chat.characters[name]
    state.chat.characters.delete(name, char)
    for (let channel of state.chat.channelState.values()) {
      channel.characters.$remove(char)
    }
  },

  SetCharacterStatus (state, name: CharacterName, status: Status, message: string) {
    state.chat.characters.get(name).setStatus(status, message)
  },

  SetFocusedCharacter (state, name: CharacterName) {
    const char: Character = state.chat.characters.get(name) || new Character(name, 'None', 'offline')
    state.ui.focusedCharacter = char
  },

  SetChannelList (state, which: 'public' | 'private', channels: ChannelInfo[]) {
    const map: ChannelInfoMap = new Map()
    for (let info of channels) { map.set(info.id, info) }
    Vue.set(state.chat.channels, which, map)
  },

  AddActiveChannel (state, id: ChannelID, name: string) {
    state.chat.activeChannels.push(id)
    // TODO: preserve logs from previous channel state if any were found
    state.chat.channelState.set(id, new ChannelState(id, name))
  },

  RemoveActiveChannel (state, id: ChannelID) {
    state.chat.activeChannels.$remove(id)
  },

  SetChannelCharacterList (state, id: ChannelID, characters: CharacterName[]) {
    const charlist: Character[] = characters
      .map(name => state.chat.characters[name])
      .filter(char => char != null)

    state.chat.channelState.get(id).characters = charlist
  },

  // SetChannelMode (state, id: ChannelID, mode: ChannelMode) {
  //   state.chat.activeChannels[id].mode = mode
  // },

  SetChannelDescription (state, id: ChannelID, description: string) {
    state.chat.channelState.get(id).description = description
  },

  AddChannelCharacter (state, id: ChannelID, name: CharacterName) {
    const char = state.chat.characters.get(name)
    state.chat.channelState.get(id).characters.push(char)
  },

  RemoveChannelCharacter (state, id: ChannelID, name: CharacterName) {
    const char = state.chat.characters.get(name)
    state.chat.channelState.get(id).characters.$remove(char)
  },

  AddChannelMessage (state, id: ChannelID, sender: CharacterName, text: string, type: MessageType) {
    const char = state.chat.characters.get(sender)
    state.chat.channelState.get(id).addMessage(new ChatMessage(char, text, type))
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
    const char = state.chat.characters.get(sender)
    const message = new ChatMessage(char, text, 'normal')
    if (!state.chat.privateMessages.get(partner)) {
      state.chat.privateMessages.set(partner, new PrivateChatState(partner))
    } else {
      state.chat.privateMessages.get(partner).push(message)
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
    const char: Character = state.chat.characters.get(sender)
    state.chat.newPrivateMessage = { sender: char, message }
  },

  SetLoadingMessage (state, message: string) {
    state.ui.loadingMessage = message
  }
}

Vue.use(Vuex)

export default new Vuex.Store({ state, mutations })
