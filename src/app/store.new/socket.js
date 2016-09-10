// @flow
import state from './state'
import * as socket from '../socket'
import meta from '../../../package.json'
import {setStatus} from './chat'
import type {SocketState} from '../types'

export function setSocketState (socketState: SocketState) {
  state.socketState = socketState
}

export function connectToChatServer () {
  if (socket.isConnected()) return

  const ws = socket.connect()

  ws.onopen = () => {
    console.log('Socket opened')
    setSocketState('connected')
    identify()
  }

  ws.onclose = () => {
    console.log('Socket closed')
    setSocketState('offline')
  }

  ws.onerror = (err) => {
    console.error('Socket error:', err)
    setSocketState('offline')
  }

  ws.onmessage = (msg) => {
    const {data} = msg
    const command = data.substring(0, 3)
    const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}
    socket.handleCommand(command, params)
  }
}

export function disconnectFromChatServer () {
  socket.disconnect()
}

export function identify () {
  socket.sendCommand('IDN', {
    method: 'ticket',
    account: state.account,
    ticket: state.ticket,
    character: state.identity,
    cname: meta.name,
    cversion: meta.version
  })
}

export function requestChannels () {
  socket.sendCommand('CHA')
  socket.sendCommand('ORS')
}

export function joinChannel (channel: string) {
  socket.sendCommand('JCH', { channel })
}

export function leaveChannel (channel: string) {
  socket.sendCommand('LCH', { channel })
}

export function sendChannelMessage (channel: string, message: string) {
  socket.sendCommand('MSG', { channel, message })
}

export function sendPrivateMessage (recipient: string, message: string) {
  socket.sendCommand('PRI', { recipient, message })
}

export function updateStatus (status: string, statusmsg: string) {
  socket.sendCommand('STA', { status, statusmsg })
  setStatus(status, statusmsg)
}

export function ignoreAction (character: string, action: string) {
  // action can be: 'add', 'delete', 'notify', or 'list'
  // https://wiki.f-list.net/F-Chat_Client_Commands#IGN
  socket.sendCommand('IGN', { character, action })
}
