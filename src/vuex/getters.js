import {ChannelState} from '../models'

export const userData = state => Object.assign({}, state.userData)

export const publicChannels = state => state.publicChannels.slice()

export const privateChannels = state => state.privateChannels.slice()

export const userChannels = state => Object.assign({}, state.channels)
