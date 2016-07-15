// alias types
export type CharacterName = string
export type ChannelID = string

export type Character = {
  name: CharacterName,
  gender: Gender,
  status: CharacterStatus,
  relation: CharacterRelation[]
}

export type CharacterStatus = {
  state: CharacterStatusState,
  message: string
}

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
  modeFilter: ChannelMode,
  description: string,
  characters: Character[],
  messages: ChatMessage[]
}

export type PrivateChatState = {
  partner: Character,
  messages: ChatMessage[]
}

export type ChatMessage = {
  sender: Character,
  message: string,
  type: ChatMessageType,
  time: Date
}

export type LoginData = {
  account: string,
  ticket: string,
  friends: FriendInfo[],
  characters: CharacterName[],
  bookmarks: CharacterName[]
}

export type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-Herm'
  | 'Cunt-boy'
  | 'None'

export type CharacterStatusState
  = 'online'
  | 'looking'
  | 'busy'
  | 'away'
  | 'dnd'
  | 'idle'
  | 'offline'
  | 'crown' // ???

export type CharacterRelation
  = 'friend'
  | 'bookmark'
  | 'admin'
  | 'looking'
  | 'ignored'

export type ChannelMode
  = 'both'
  | 'chat'
  | 'ads'

export type ChatMessageType
  = 'chat'
  | 'lfrp'
  | 'admin'
  | 'system'

export type Event = {}
  | { type: 'LoginRequest' }
  | { type: 'LoginSuccess', loginData: LoginData, remember: boolean }
  | { type: 'LoginFailure' }

  | { type: 'DisconnectRequest' }

  | { type: 'PushOverlay', overlay: string }
  | { type: 'PopOverlay' }

  | { type: 'SocketConnectionSuccess' }
  | { type: 'SocketIdentifySuccess' }
  | { type: 'SocketError', error: string }

  | { type: 'UserCharacterSelected', name: CharacterName }
  | { type: 'CharacterActivated', name: Character }

  | { type: 'JoinChannelRequest', id: ChannelID }
  | { type: 'JoinChannelSuccess', id: ChannelID }
  | { type: 'LeaveChannelRequest', id: ChannelID }
  | { type: 'LeaveChannelSuccess', id: ChannelID }

  | { type: 'ChannelMessageSent', channel: ChannelID, message: string }
  | { type: 'ChannelMessageReceived', channel: ChannelID, sender: Character, message: string }

  | { type: 'PrivateChatOpened', who: Character }
  | { type: 'PrivateMessageSent', recipient: Character, message: string }
  | { type: 'PrivateMessageReceived', sender: Character, message: string }

  | { type: 'UserStatusChanged', status: CharacterStatus, statusText: string }
