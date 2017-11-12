import { sendSocketCommand } from 'src/chat/actions/socketActions'

export function fetchChannelList() {
  sendSocketCommand('CHA')
  sendSocketCommand('ORS')
}
