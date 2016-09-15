// @flow
import type {
  Name, Character, ChannelInfo, Channel, PrivateChat
} from '../lib/types'

type CharacterMap = { [name: Name]: Character }
type ChannelMap = { [id: string]: Channel }
type PrivateChatMap = { [partner: Name]: PrivateChat }
type RelationshipMap = { [friend: Name]: Name[] }
type NameMap = { [name: Name]: boolean }

export const state = {
  currentView: ('': string),
  loadingMessage: ('': string),

  account: ('': string),
  ticket: ('': string),

  userCharacters: ([]: Name[]),
  identity: ('': Name),

  socket: (null: ?window.WebSocket),

  onlineCharacters: ({}: CharacterMap),

  friends: ({}: RelationshipMap),
  ignored: ({}: NameMap),
  admins: ({}: NameMap),

  publicChannelList: ([]: ChannelInfo[]),
  privateChannelList: ([]: ChannelInfo[]),

  joinedChannels: ({}: ChannelMap),
  privateChats: ({}: PrivateChatMap)
}
