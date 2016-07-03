import Vue from 'vue'
import type {LoginData, Character, CharacterStatus, ChannelID} from './types.new'

export type LoginSuccess = { userData: LoginData, remember: boolean }
export type LogoutRequest = {}

export type PushOverlay = { overlay: string }
export type PopOverlay = {}

export type UserCharacterSelected = { name: Character }
export type CharacterActivated = { name: Character }

export type SocketIdentifySuccess = {}
export type SocketError = { error: string }
export type SocketChannelJoined = { id: ChannelID }
export type SocketChannelLeft = { id: ChannelID }

export type JoinChannelRequest = { id: ChannelID }
export type LeaveChannelRequest = { id: ChannelID }

export type ChannelMessageSent = { channel: ChannelID, message: string }
export type ChannelMessageReceived = { channel: ChannelID, sender: Character, message: string }

export type PrivateMessageSent = { recipient: Character, message: string }
export type PrivateMessageReceived = { sender: Character, message: string }
export type PrivateChatOpened = { who: Character }

export type UserStatusChanged = { status: CharacterStatus, statusText: string }

// global dispatcher
// use $on to subscribe, and $emit to trigger
export default new Vue()
