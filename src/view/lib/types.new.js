// struct types
export type AppState = {
  auth: {
    account: string,
    ticket: string
  },

  user: {
    character: CharacterName,
    characterList: CharacterName[],
    status: CharacterStatus
  },

  chat: {
    characters: Character[],
    friends: FriendInfo[],
    bookmarks: Character[],
    ignored: Character[],
    admins: Character[],
    publicChannels: ChannelInfo[],
    privateChannels: ChannelInfo[],
    activeChats: (ChannelState | PrivateChatState)[],
    serverVariables: { [key: string]: number }
  }
}

export type Character = {
  name: CharacterName,
  gender: Gender,
  status: CharacterStatus,
  type: CharacterType[]
}

export type LoginData = {
  account: string,
  ticket: string,
  friends: FriendInfo[],
  characters: CharacterName[],
  bookmarks: CharacterName[]
}

export type FriendInfo = {
  you: string,
  them: string
}

export type CharacterStatus = {
  state: CharacterStatusState,
  message: string
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

export type ChatMessage = {
  sender: Character,
  message: string,
  kind: ChatMessageKind
}

export type PrivateChatState = {
  partner: Character,
  messages: ChatMessage[]
}

// enum types
export type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-herm'
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
  | 'crown'

export type CharacterType
  = 'friend'
  | 'bookmark'
  | 'admin'
  | 'looking'
  | 'ignored'

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

// aliases, preferably for generic values that have a special meaning to them
export type CharacterName = string
export type ChannelID = string
