import {
  CharacterName,
  Gender,
  Character,
  ChannelState,
  ChatMessage
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
