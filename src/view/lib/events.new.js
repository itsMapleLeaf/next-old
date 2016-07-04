import type {LoginData, Character, CharacterStatus, ChannelID} from './types.new'

export type Event = {}
  | { type: 'LoginSuccess', userData: LoginData, remember: boolean }
  | { type: 'LogoutRequest' }

  | { type: 'PushOverlay', overlay: string }
  | { type: 'PopOverlay' }

  | { type: 'UserCharacterSelected', name: Character }
  | { type: 'CharacterActivated', name: Character }

  | { type: 'SocketIdentifySuccess'}
  | { type: 'SocketError', error: string }
  | { type: 'SocketChannelJoined', id: ChannelID }
  | { type: 'SocketChannelLeft', id: ChannelID }

  | { type: 'JoinChannelRequest', id: ChannelID }
  | { type: 'LeaveChannelRequest', id: ChannelID }

  | { type: 'ChannelMessageSent', channel: ChannelID, message: string }
  | { type: 'ChannelMessageReceived', channel: ChannelID, sender: Character, message: string }

  | { type: 'PrivateChatOpened', who: Character }
  | { type: 'PrivateMessageSent', recipient: Character, message: string }
  | { type: 'PrivateMessageReceived', sender: Character, message: string }

  | { type: 'UserStatusChanged', status: CharacterStatus, statusText: string }
