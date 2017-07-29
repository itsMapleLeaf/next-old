import {
  Name,
  Character,
  ChannelInfo,
  Channel,
  PrivateChat,
  ChatTab,
} from '../lib/types'

type CharacterMap = { [name: string]: Character }
type ChannelMap = { [id: string]: Channel }
type PrivateChatMap = { [partner: string]: PrivateChat }
type RelationshipMap = { [friend: string]: Name[] }
type NameMap = { [name: string]: boolean }

type AppState =
  | 'setup'
  | 'login'
  | 'logging-in'
  | 'character-select'
  | 'connecting'
  | 'identifying'
  | 'online'

export const state = {
  appState: 'setup' as AppState,

  account: '',
  ticket: '',

  userCharacters: [] as string[],
  identity: '',

  socket: null as null | WebSocket,

  onlineCharacters: {} as CharacterMap,

  friends: {} as RelationshipMap,
  bookmarks: {} as NameMap,
  ignored: {} as NameMap,
  admins: {} as NameMap,

  publicChannelList: [] as ChannelInfo[],
  privateChannelList: [] as ChannelInfo[],

  channels: {} as ChannelMap,
  privateChats: {} as PrivateChatMap,

  chatTabs: [] as ChatTab[],
  characterMenuFocus: null as Character | null,

  notifications: [] as any[],
}
