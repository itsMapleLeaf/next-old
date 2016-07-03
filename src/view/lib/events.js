export const LoginSuccess = 'LoginSuccess' // (userData: object)
export const LogoutRequest = 'LogoutRequest' // ()
export const SwitchCharacterRequest = 'SwitchCharacterRequest' // ()

export const OverlayChangeRequest = 'OverlayChangeRequest' // (overlay: string)
export const PushOverlay = 'PushOverlay' // (overlay: string)
export const PopOverlay = 'PopOverlay'   // ()

export const CharacterSelected = 'CharacterSelected'   // (characterName: string)
export const CharacterActivated = 'CharacterActivated' // (character: string)

export const SocketIdentifySuccess = 'IdentifySuccess'               // ()
export const SocketError = 'SocketError'                             // (error: string)
export const SocketChannelJoined = 'SocketChannelJoined'             // (channelID: string)
export const SocketChannelLeft = 'SocketChannelLeft'                 // (channelID: string)
export const SocketChannelListReceived = 'SocketChannelListReceived' // (type: ChannelType)

export const ToggleChannelRequest = 'ToggleChannelRequest' // (channelID: string)
export const LeaveChannelRequest = 'LeaveChannelRequest'   // (channelID: string)

export const ChannelMessageSent = 'ChannelMessageSent'         // (channelID: string, message: string)
export const ChannelMessageReceived = 'ChannelMessageReceived' // (channelID: string, characterName: string, message: string)

export const PrivateMessageSent = 'PrivateMessageSent'         // (character: Character, message: string)
export const PrivateMessageReceived = 'PrivateMessageReceived' // (characterName: string, message: string)
export const OpenPrivateChatRequest = 'OpenPrivateChatRequest' // (partner: string)
export const ChatStateReset = 'ChatStateReset' // ()

export const ChatboxSubmit = 'ChatboxSubmit' // (message: string)
