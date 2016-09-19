// @flow

// alias types
export type Name = string
export type CharacterBatchEntry = [Name, Gender, Status, string]

// enum types
export type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-herm'
  | 'None'

export type Status
  = 'online'
  | 'looking'
  | 'busy'
  | 'away'
  | 'dnd'
  | 'idle'
  | 'offline'

export type ChannelMode
  = 'both'
  | 'chat'
  | 'ads'

export type MessageType
  = 'chat'
  | 'lfrp'
  | 'friend'
  | 'admin'
  | 'self'
  | 'dice'
  | 'bottle'

export type SocketState
  = 'offline'
  | 'connecting'
  | 'connected'
  | 'identified'

export type Category
  = 'friend'
  | 'bookmark'
  | 'admin'
  | 'op'
  | 'looking'
  | 'none'

export type TypingState
  = 'clear'
  | 'paused'
  | 'typing'

// object types
export type Character = {
  name: Name,
  gender: Gender,
  status: Status,
  statusmsg: string
}

export type Message = {
  sender: Character,
  message: string,
  type: MessageType,
  time: number
}

export type Channel = {
  id: string,
  name: string,
  description: string,
  mode: ChannelMode,
  users: Character[],
  ops: Name[],
  messages: Message[]
}

export type PrivateChat = {
  partner: Character,
  messages: Message[],
  typing: TypingState
}

export type Relationship = {
  you: Name,
  them: Name
}

export type Bubble = {
  text: string,
  onclick: Function
}

export type ChannelInfo = {
  id: string,
  name: string,
  userCount: number,
  mode: ChannelMode
}

export type ChatTab = {
  channel?: Channel,
  privateChat?: PrivateChat
}

export type Notification = {
  text: string,
  time: number
}
