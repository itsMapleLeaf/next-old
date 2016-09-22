// @flow
// reference: https://wiki.f-list.net/F-Chat_Server_Commands
/* eslint no-unused-vars: off */

import type {Channel, ChannelInfo} from '../lib/types'
import {state} from './state'
import {mapToObject} from '../lib/util'
import {newCharacter, newChannelInfo, newMessage} from '../lib/constructors'
import * as store from './store'

type Params = { [key: string]: any }

export function IDN() {
  console.info('Successfully identified with server.')
  state.appState = 'online'
  store.loadChatTabs(state.identity)
}

export function HLO(params: Params) {
  console.info(params.message)
}

/* ping~! */
export function PIN() {
  store.sendCommand('PIN') /* pong ~! */
}

export function ERR(params: Params) {
  console.info('Socket error', params.message)
}

// ignored
export function CON() {}

// ignored; we get friends from f-list
export function FRL() {}

export function IGN({ action, character: name, characters }: Params) {
  switch (action) {
    case 'init':
    case 'list':
    case 'notify':
      state.ignored = mapToObject(characters, name => [name, true])
      break

    case 'add':
      state.ignored[name] = true
      break

    case 'delete':
      delete state.ignored[name]
      break
  }
}

export function ADL(params: Params) {
  state.admins = mapToObject(params.ops, name => [name, true])
}

export function AOP({ character }: Params) {
  state.admins[character] = true
}

export function LIS(params: Params) {
  store.addCharacterBatch(params.characters)
}

export function NLN({ identity, gender }: Params) {
  state.onlineCharacters[identity] = newCharacter(identity, gender)
}

export function FLN({ character: name }: Params) {
  for (const ch of Object.values(state.channels)) {
    if (ch instanceof Object) ch.users = ch.users.filter(u => u.name !== name)
  }
  delete state.onlineCharacters[name]
}

export function STA({ character, status, statusmsg }: Params) {
  const char = state.onlineCharacters[character]
  char.status = status
  char.statusmsg = statusmsg
}

function mapChannelInfo(channels: any[]): ChannelInfo[] {
  return channels.map(ch => newChannelInfo(ch.name, ch.title || ch.name, ch.characters, ch.mode))
}

export function CHA({ channels }: Params) {
  state.publicChannelList = mapChannelInfo(channels)
}

export function ORS({ channels }: Params) {
  state.privateChannelList = mapChannelInfo(channels)
}

export function JCH({ channel: id, title, character: { identity: name } }: Params) {
  state.channels[id].name = title
  state.channels[id].users.push(state.onlineCharacters[name])
}

export function LCH({ channel: id, character: name }: Params) {
  const channel = state.channels[id]
  channel.users = channel.users.filter(char => char.name !== name)
}

export function COL({ channel: id, oplist }: Params) {
  state.channels[id].ops = oplist
}

export function ICH({ channel: id, mode, users }: Params) {
  const channel = state.channels[id]
  const userlist = users.map(({ identity }) => state.onlineCharacters[identity])
  channel.mode = mode
  channel.users = userlist
}

export function CDS({ channel: id, description }: Params) {
  state.channels[id].description = description
}

export function RMO({ mode, channel: id }: Params) {
  state.channels[id].mode = mode
}

export function MSG({ channel: id, character: name, message }: Params) {
  const char = state.onlineCharacters[name]
  state.channels[id].messages.push(newMessage(char, message, 'chat'))
}

export function LRP({ channel: id, character: name, message }: Params) {
  const char = state.onlineCharacters[name]
  state.channels[id].messages.push(newMessage(char, message, 'lfrp'))
}

export function PRI({ character: name, message }: Params) {
  const chat = state.privateChats[name] || store.openPrivateChat(name)
  const char = state.onlineCharacters[name]
  chat.messages.push(newMessage(char, message, 'chat'))
}

export function TPN({ character: name, status }: Params) {
  const chat = state.privateChats[name]
  if (chat) {
    chat.typing = status
  }
}

export function RLL(params: Params) {
  const {type, channel: id, character: name} = params
  const char = state.onlineCharacters[name]
  let message = ''

  if (type === 'dice') {
    const {results, rolls, endresult} = params
    message = `${name} rolled ${rolls.join(', ')}: ${endresult} (${results.join(', ')})`
  } else if (type === 'bottle') {
    const {target} = params
    message = `${name} spun the bottle. It landed on: ${target}`
  }

  state.channels[id].messages.push(newMessage(char, message, type))
}

export function BRO({ message: text }: Params) {
  state.notifications.push({ text, time: Date.now() })
}

export function CIU({ sender, title, name }: Params) {
  // show confirmation bubble
}

export function CKU({ operator, channel: id, character: name }: Params) {
  const channel = state.channels[id]
  channel.users = channel.users.filter(u => u.name !== name)
}

export function COA({ character: name, channel: id }: Params) {
  state.channels[id].ops.push(name)
}

export function COR({ character: name, channel: id }: Params) {
  const channel = state.channels[id]
  channel.ops = channel.ops.filter(op => op !== name)
}

export function CSO({ character: name, channel: id }: Params) {
  // ???
}

export function CTU({ channel: id, length, character: name }: Params) {
  const channel = state.channels[id]
  channel.users = channel.users.filter(u => u.name !== name)
}

export function DOP({ character: name }: Params) {
  state.admins[name] = false
}

export function FKS() {
  // deal with this later
}

export function KID() {
  // probably just set state.onlineCharacters[name].kinks or something
}

export function PRD() {
  // *definitely* do something with this
}

export function RTB() {
  // probably more notifications
}

export function SFC() {
  // hm...
}

export function SYS() {
  // again, notification
}
