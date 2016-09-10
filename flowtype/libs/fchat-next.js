// alias types
declare type Name = string

// enum types
declare type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-herm'
  | 'None'

declare type Status
  = 'online'
  | 'looking'
  | 'busy'
  | 'away'
  | 'dnd'
  | 'idle'
  | 'offline'

declare type ChannelMode
  = 'both'
  | 'chat'
  | 'ads'

declare type MessageType
  = 'chat'
  | 'lfrp'
  | 'friend'
  | 'admin'
  | 'self'

declare type SocketState
  = 'offline'
  | 'connecting'
  | 'connected'
  | 'identified'

// object types
declare type Character = {
  name: Name,
  gender: Gender,
  status: Status,
  statusmsg: string
}

declare type Message = {
  sender: Character,
  message: string,
  type: MessageType,
  time: number
}

declare type Channel = {
  id: string,
  name: string,
  description: string,
  mode: ChannelMode,
  characters: Name[],
  ops: Name[]
}

declare type PrivateChat = {
  partner: Character,
  messages: Message[]
}

declare type Relationship = {
  you: Name,
  them: Name
}
