import {
  CharacterName,
  Gender,
  Character,
  ChannelState,
  ChatMessage,
  ChatMessageType
} from 'modules/types'

export function createCharacter (name: CharacterName, gender: Gender): Character {
  return {
    name,
    gender,
    status: {
      state: 'online',
      message: ''
    },
    relation: []
  }
}

export function createChannelState (id, name): ChannelState {
  return {
    type: 'channel',
    id,
    name,
    mode: 'both',
    modeFilter: 'both',
    description: '',
    characters: [],
    messages: []
  }
}

export function createChatMessage (sender: Character, message: string, type: ChatMessageType): ChatMessage {
  return {
    sender,
    message,
    type,
    date: new Date()
  }
}
