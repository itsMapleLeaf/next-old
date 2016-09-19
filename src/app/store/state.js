// @flow
import type {
  Name, Character, ChannelInfo, Channel, PrivateChat, ChatTab
} from '../lib/types'

type CharacterMap = { [name: Name]: Character }
type ChannelMap = { [id: string]: Channel }
type PrivateChatMap = { [partner: Name]: PrivateChat }
type RelationshipMap = { [friend: Name]: Name[] }
type NameMap = { [name: Name]: boolean }

type AppState
  = 'setup'
  | 'login'
  | 'logging-in'
  | 'character-select'
  | 'connecting'
  | 'identifying'
  | 'online'

export const state = {
  appState: ('setup': AppState),

  account: ('': string),
  ticket: ('': string),

  userCharacters: ([]: Name[]),
  identity: ('': Name),

  socket: (null: ?window.WebSocket),

  onlineCharacters: ({}: CharacterMap),

  friends: ({}: RelationshipMap),
  bookmarks: ({}: NameMap),
  ignored: ({}: NameMap),
  admins: ({}: NameMap),

  publicChannelList: ([]: ChannelInfo[]),
  privateChannelList: ([]: ChannelInfo[]),

  channels: ({}: ChannelMap),
  privateChats: ({}: PrivateChatMap),

  chatTabs: ([]: ChatTab[]),
  characterMenuFocus: (null: ?Character),

  notifications: []
}
