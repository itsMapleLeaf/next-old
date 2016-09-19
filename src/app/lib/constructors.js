// @flow
import type {
  Name, Gender, Status, Character,
  Channel, ChannelMode, ChannelInfo,
  PrivateChat,
  Message, MessageType
} from './types'

export function newCharacter (
  name: Name, gender: Gender, status?: Status = 'online', statusmsg?: string = ''
): Character {
  return { name, gender, status, statusmsg }
}

export function newMessage (
  sender: Character, message: string, type: MessageType
): Message {
  return { sender, type, message, time: Date.now() }
}

export function newChannel (id: string, name: string): Channel {
  return {
    id,
    name,
    description: '',
    mode: 'both', // either 'both', 'chat', or 'ads'
    users: [],
    ops: [],
    messages: []
  }
}

export function newChannelInfo (
  id: string,
  name: string,
  userCount: number,
  mode: ChannelMode
): ChannelInfo {
  return { id, name, userCount, mode }
}

export function newPrivateChat (partner: Character): PrivateChat {
  return {
    partner,
    messages: [],
    typing: 'clear'
  }
}
