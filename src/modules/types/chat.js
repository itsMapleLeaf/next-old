import type {Character, CharacterName} from './character'

export type FriendInfo = {
  you: CharacterName,
  them: CharacterName
}

export type ChannelInfo = {
  id: ChannelID,
  name: string,
  userCount: number
}

export type ChannelState = {
  id: ChannelID,
  name: string,
  mode: ChannelMode,
  preference: ChannelMode,
  description: string,
  characters: Character[],
  messages: ChatMessage[],
  status: ChannelStatus
}

export type PrivateChatState = {
  partner: Character,
  messages: ChatMessage[]
}

export type ChatMessage = {
  sender: Character,
  message: string,
  kind: ChatMessageKind,
  time: Date
}

export type ChannelStatus
  = 'left'
  | 'joining'
  | 'joined'
  | 'leaving'

export type ChannelMode
  = 'both'
  | 'chat'
  | 'ads'

export type ChatMessageKind
  = 'chat'
  | 'lfrp'
  | 'admin'
  | 'system'

export type ChannelID = string
export type ActiveChatState = ChannelState | PrivateChatState
