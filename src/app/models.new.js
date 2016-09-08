// @flow

// alias types
type CharacterName = string

// enum types
type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-herm'
  | 'None'

type Status
  = 'online'
  | 'looking'
  | 'busy'
  | 'away'
  | 'dnd'
  | 'idle'
  | 'offline'

type MessageType
  = 'chat'
  | 'lfrp'
  | 'friend'
  | 'admin'
  | 'self'

// object types
export type Character = {
  name: CharacterName,
  gender: Gender,
  status: Status,
  statusmsg: string
}

export type Message = {
  sender: CharacterName,
  message: string,
  type: MessageType,
  time: number
}

export type Channel = {
  id: string,
  name: string,
  description: string,
  mode: 'chat' | 'ads' | 'both',
  characters: CharacterName[],
  ops: CharacterName[]
}

export type PrivateChat = {
  partner: CharacterName,
  messages: Message[]
}

// constructors
export function newCharacter (
  name: CharacterName,
  gender: Gender,
  status: Status = 'online',
  statusmsg: string = ''
): Character {
  return { name, gender, status, statusmsg }
}

export function newMessage (
  sender: CharacterName,
  message: string,
  type: MessageType
): Message {
  return { sender, type, message, time: Date.now() }
}

export function newChannel (id: string, name: string): Channel {
  return {
    id,
    name,
    description: '',
    mode: 'both', // either 'both', 'chat', or 'ads'
    characters: [],
    ops: []
  }
}

export function newPrivateChat (partner: CharacterName): PrivateChat {
  return {
    partner,
    messages: []
  }
}
