import Vue from 'vue'
import Vuex from 'vuex'

import Character from '../../types/Character'
import ChatMessage from '../../types/ChatMessage'
import ChannelInfo from '../../types/ChannelInfo'
import ChannelState from '../../types/ChannelState'
import PrivateChatState from '../../types/PrivateChatState'

import type {Gender, Status, FriendInfo} from '../../types/Character'
import type {MessageType} from '../../types/ChatMessage'

type CharacterName = string
type ChannelID = string
type ServerVariable = number | string | string[]
type CharacterBatchEntry = [CharacterName, Gender, Status, string]
type Notice = { text: string }

type ConnectionState
  = 'offline'
  | 'connecting'
  | 'online'
  | 'identified'

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

  characters: { [name: CharacterName]: Character } = {}
  friends: FriendInfo[] = []
  bookmarks: CharacterName[] = []
  ignored: CharacterName[] = []
  admins: CharacterName[] = []

  channels: { [which: string]: ChannelInfo[] } = {
    public: [],
    private: []
  }

  activeChannels: ChannelID[] = []
  activePrivateChats: CharacterName[] = []

  channelState: { [id: ChannelID]: ChannelState } = {}
  privateChatState: { [id: ChannelID]: PrivateChatState } = {}

  newPrivateMessage: ChatMessage

  serverVariables: { [key: string]: ServerVariable } = {}

  addCharacter (char: Character) {
    this.characters[char.name] = char
  }

  removeCharacter (name: CharacterName) {
    delete this.characters[name]
  }

  getCharacter (name: CharacterName): Character {
    return this.characters[name] || new Character(name, 'None', 'offline')
  }
}

class UIState {
  overlays: string[] = []
  focusedCharacter: Character
  notices: Notice[] = []
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
    state.chat.friends = friends
  },

  SetBookmarkList (state, bookmarks: CharacterName[]) {
    state.chat.bookmarks = bookmarks
  },

  AddBookmark (state, char: CharacterName) {
    state.chat.bookmarks.push(char)
  },

  RemoveBookmark (state, char: CharacterName) {
    state.chat.bookmarks.$remove(char)
  },

  SetIgnoreList (state, ignored: CharacterName[]) {
    state.chat.ignored = ignored
  },

  AddIgnoredCharacter (state, char: CharacterName) {
    state.chat.ignored.push(char)
  },

  RemoveIgnoredCharacter (state, char: CharacterName) {
    state.chat.ignored.$remove(char)
  },

  SetAdminList (state, admins: CharacterName[]) {
    state.chat.admins = admins
  },

  SetServerVariable (state, key: string, value: number | string | string[]) {
    state.chat.serverVariables[key] = value
  },

  SetConnectionState (state, conn: ConnectionState) {
    state.chat.connectionState = conn
  },

  AddCharacterBatch (state, batch: CharacterBatchEntry[]) {
    const map = {}
    for (let entry of batch) {
      const [name, gender, status, statusmsg] = entry
      const char = new Character(state, name, gender, status, statusmsg)
      char.onlineSince = Date.now() // not 100% accurate, but works well enough
      map[name] = char
    }
    Object.assign(state.chat.characters, map)
  },

  AddCharacter (state, name: CharacterName, gender: Gender) {
    const char = new Character(state, name, gender)
    state.chat.addCharacter(char)
    char.onlineSince = Date.now()
  },

  RemoveCharacter (state, name: CharacterName) {
    const char = state.chat.characters[name]
    state.chat.removeCharacter(name)
    for (let channel of Object.values(state.chat.channelState)) {
      channel.characters.$remove(char)
    }
  },

  SetCharacterStatus (state, name: CharacterName, status: Status, message: string) {
    state.chat.characters[name].setStatus(status, message)
  },

  SetFocusedCharacter (state, name: CharacterName) {
    const char: Character = state.chat.characters[name] || new Character(state, name, 'None', 'offline')
    Vue.set(state.ui, 'focusedCharacter', char)
  },

  SetChannelList (state, which: 'public' | 'private', channels: ChannelInfo[]) {
    Vue.set(state.chat.channels, which, channels)
  },

  ClearActiveChannels (state) {
    state.chat.activeChannels = []
  },

  AddActiveChannel (state, id: ChannelID, name: string) {
    state.chat.activeChannels.push(id)
    // TODO: preserve logs from previous channel state if any were found
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
      if (!state.chat.privateChatState[partner]) {
        Vue.set(state.chat.privateChatState, partner, new PrivateChatState(state.chat.getCharacter(partner)))
      }
    }
  },

  RemoveActivePrivateChat (state, partner: CharacterName) {
    state.chat.activePrivateChats.$remove(partner)
  },

  AddPrivateChatMessage (state, partner: CharacterName, sender: CharacterName, text: string) {
    const char = state.chat.characters[sender]
    const message = new ChatMessage(char, text, 'normal')
    if (!state.chat.privateChatState[partner]) {
      Vue.set(state.chat.privateChatState, partner, new PrivateChatState(state.chat.getCharacter(partner)))
    }
    state.chat.privateChatState[partner].messages.push(message)
  },

  PushOverlay (state, overlay: string) {
    state.ui.overlays.push(overlay)
  },

  PopOverlay (state) {
    state.ui.overlays.pop()
  },

  AddNewNotice (state, text: string) {
    const notices = state.ui.notices
    notices.push({ text })
    if (notices.length > 50) {
      notices.shift()
    }
  },

  SetNewPrivateMessage (state, sender: CharacterName, message: string) {
    const char: Character = state.chat.getCharacter(sender)
    state.chat.newPrivateMessage = new ChatMessage(char, message)
  },

  SetLoadingMessage (state, message: string) {
    state.ui.loadingMessage = message
  }
}

Vue.use(Vuex)

export default new Vuex.Store({ state, mutations })
