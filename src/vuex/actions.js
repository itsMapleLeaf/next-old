import {http} from 'vue'
import SocketHandler from '../socket-handler'

export function joinChannel (store, id, name) {
  store.dispatch('CHANNEL_JOIN_REQUEST', id, name)
}

export function leaveChannel (store, id) {
  store.dispatch('CHANNEL_LEAVE_REQUEST', id)
}

export function sendChannelMessage (store, message) {
  store.dispatch('SEND_CHANNEL_MESSAGE', message)
}
