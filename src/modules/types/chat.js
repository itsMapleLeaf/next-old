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
  type: 'channel',
  id: ChannelID,
  name: string,
  mode: ChannelMode,
  preference: ChannelMode,
  description: string,
  characters: Character[],
  messages: ChatMessage[]
}

export type PrivateChatState = {
  type: 'privateChat',
  partner: Character,
  messages: ChatMessage[]
}

export type ChatMessage = {
  sender: Character,
  message: string,
  kind: ChatMessageKind,
  time: Date
}

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

export function createChannelState (id, name): ChannelState {
  return {
    type: 'channel',
    id,
    name,
    mode: 'both',
    preference: 'both',
    description: '',
    characters: [],
    messages: []
  }
}

export function createChatMessage (sender, message, kind): ChatMessage {
  return {
    sender,
    message,
    kind,
    date: new Date()
  }
}
