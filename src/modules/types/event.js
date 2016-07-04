import type {LoginData} from 'types/app'
import type {Character, CharacterStatus, CharacterName} from 'types/character'
import type {ChannelID} from 'types/chat'

export type Event = {}
  | { type: 'LoginRequest' }
  | { type: 'LoginSuccess', loginData: LoginData, remember: boolean }
  | { type: 'LoginFailure' }

  | { type: 'LogoutRequest' }

  | { type: 'PushOverlay', overlay: string }
  | { type: 'PopOverlay' }

  | { type: 'IdentifySuccess'}
  | { type: 'SocketError', error: string }

  | { type: 'UserCharacterSelected', name: CharacterName }
  | { type: 'CharacterActivated', name: Character }

  | { type: 'JoinChannelRequest', id: ChannelID }
  | { type: 'JoinChannelSuccess', id: ChannelID }
  | { type: 'LeaveChannelRequest', id: ChannelID }
  | { type: 'LeaveChannelSuccess', id: ChannelID }

  | { type: 'ChannelMessageSent', channel: ChannelID, message: string }
  | { type: 'ChannelMessageReceived', channel: ChannelID, sender: Character, message: string }

  | { type: 'PrivateChatOpened', who: Character }
  | { type: 'PrivateMessageSent', recipient: Character, message: string }
  | { type: 'PrivateMessageReceived', sender: Character, message: string }

  | { type: 'UserStatusChanged', status: CharacterStatus, statusText: string }
