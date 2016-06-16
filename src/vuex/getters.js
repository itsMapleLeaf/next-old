import {ChannelState} from '../models'

const nullChannel = ChannelState('null room', 'null room')

export const loginStatus = state => state.loginStatusMessage

export const userCharacters = state =>
  state.loginData.characters
    .slice()
    .sort()

export const defaultCharacter = state => state.loginData.default_character

export const userCharacterName = state => state.character

export const account = state => state.account

export const apiTicket = state => state.loginData.ticket

export const currentOverlay = state => state.currentOverlay

export const allChannels = state =>
  state.publicChannels.concat(state.privateChannels)

export const joinedChannels = state =>
  state.joinedChannels.slice()

export const selectedChannel = state =>
  state.joinedChannels[state.selectedChannelIndex] || nullChannel
