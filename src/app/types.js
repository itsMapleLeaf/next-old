// alias types
export type Name = string

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

export type SocketState
  = 'offline'
  | 'connecting'
  | 'connected'
  | 'identified'

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
  characters: Name[],
  ops: Name[]
}

export type PrivateChat = {
  partner: Character,
  messages: Message[]
}

export type Relationship = {
  you: Name,
  them: Name
}
