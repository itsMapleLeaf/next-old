import {
  CharacterName,
  Gender,
  Character,
  CharacterStatus,
  ChannelState,
  ChatMessage,
  ChatMessageType,
  PrivateChatState,
  ChannelID
} from 'modules/types'

export function createCharacter (
  name: CharacterName,
  gender: Gender,
  status?: CharacterStatus = { state: 'online', message: '' }
): Character {
  return {
    name, gender, status, relation: []
  }
}

export function createChannelState (id: ChannelID, name: string): ChannelState {
  return {
    id,
    name,
    mode: 'both',
    modeFilter: 'both',
    description: '',
    characters: [],
    messages: []
  }
}

export function createPrivateChatState (partner: Character): PrivateChatState {
  return { partner, messages: [] }
}

export function createChatMessage (sender: Character, message: string, type: ChatMessageType): ChatMessage {
  return {
    sender,
    message,
    type,
    date: new Date()
  }
}
