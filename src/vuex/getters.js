import {ChannelState} from '../models'

export const userData = state => Object.assign({}, state.userData)

export const userCharacters = state =>
  state.loginData.characters
    .slice()
    .sort()

export const userAccount = state => state.account

export const userCharacter = state => state.character

export const publicChannels = state => state.publicChannels.slice()

export const privateChannels = state => state.privateChannels.slice()

export const userChannels = state =>
  Object.assign({}, state.channels)
