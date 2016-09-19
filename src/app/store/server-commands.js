// @flow
import * as store from './store'
import {state} from './state'
import {mapToObject} from '../lib/util'
import {newCharacter, newChannelInfo, newMessage} from '../lib/constructors'

type Params = { [key: string]: any }

export function IDN () {
  console.info('Successfully identified with server.')
  state.appState = 'online'
  store.loadChatTabs(state.identity)
}

export function HLO (params: Params) {
  console.info(params.message)
}

/* ping~! */
export function PIN () {
  store.sendCommand('PIN') /* pong ~! */
}

export function ERR (params: Params) {
  console.info('Socket error', params.message)
}

export function CON () {}
export function FRL () {}

export function IGN (params: Params) {
  if (params.action === 'init') {
    state.ignored = mapToObject(params.characters, name => [name, true])
  }
}

export function ADL (params: Params) {
  state.admins = mapToObject(params.ops, name => [name, true])
}

export function LIS (params: Params) {
  store.addCharacterBatch(params.characters)
}

export function NLN ({ identity, gender }: Params) {
  state.onlineCharacters[identity] = newCharacter(identity, gender)
}

export function FLN ({ character }: Params) {
  delete state.onlineCharacters[character]
}

export function STA ({ character, status, statusmsg }: Params) {
  const char = state.onlineCharacters[character]
  char.status = status
  char.statusmsg = statusmsg
}

export function CHA ({ channels }: Params) {
  const list = channels.map(ch => newChannelInfo(ch.name, ch.name, ch.characters, ch.mode))
  state.publicChannelList = list
}

export function ORS ({ channels }: Params) {
  const list = channels.map(ch => newChannelInfo(ch.name, ch.title, ch.characters, ch.mode))
  state.privateChannelList = list
}

export function JCH ({ channel: id, title, character: { identity: name } }: Params) {
  state.channels[id].name = title
  state.channels[id].users.push(state.onlineCharacters[name])
}

export function LCH ({ channel: id, character: name }: Params) {
  const channel = state.channels[id]
  channel.users = channel.users.filter(char => char.name !== name)
}

export function COL ({ channel: id, oplist }: Params) {
  state.channels[id].ops = oplist
}

export function ICH ({ channel: id, mode, users }: Params) {
  const channel = state.channels[id]
  const userlist = users.map(({ identity }) => state.onlineCharacters[identity])
  channel.mode = mode
  channel.users = userlist
}

export function CDS ({ channel: id, description }: Params) {
  state.channels[id].description = description
}

export function MSG ({ channel: id, character: name, message }: Params) {
  const char = state.onlineCharacters[name]
  state.channels[id].messages.push(newMessage(char, message, 'chat'))
}

export function LRP ({ channel: id, character: name, message }: Params) {
  const char = state.onlineCharacters[name]
  state.channels[id].messages.push(newMessage(char, message, 'lfrp'))
}
