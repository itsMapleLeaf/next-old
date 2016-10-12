// @flow
/* eslint no-unused-vars: off */

// reference: https://wiki.f-list.net/F-Chat_Server_Commands

import type {Channel, ChannelInfo} from '../lib/types'
import {state} from './state'
import {mapToObject, values} from '../lib/util'
import {newCharacter, newChannelInfo, newMessage} from '../lib/constructors'
import * as store from './store'
import Vue from 'vue'

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
  function initIgnoredList() {
    state.ignored = mapToObject(characters, name => [name, true])
  }

  function addIgnored() {
    Vue.set(state.ignored, name, true)
  }

  function deleteIgnored() {
    Vue.delete(state.ignored, name)
  }

  const actions = {
    init: initIgnoredList,
    list: initIgnoredList,
    notify: initIgnoredList,
    add: addIgnored,
    delete: deleteIgnored,
  }

  actions[action]()
}

export function ADL(params: Params) {
  state.admins = mapToObject(params.ops, name => [name, true])
}

export function AOP({ character }: Params) {
  Vue.set(state.admins, character, true)
}

export function LIS(params: Params) {
  store.addCharacterBatch(params.characters)
}

export function NLN({ identity, gender }: Params) {
  Vue.set(state.onlineCharacters, identity, newCharacter(identity, gender))
}

export function FLN({ character: name }: Params) {
  for (const ch of values(state.channels)) {
    if (ch instanceof Object) {
      ch.users = ch.users.filter(u => u != null && u.name !== name)
    }
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

const rolltypes = {
  dice({ results, rolls, endresult }) {
    if (results.length > 0) {
      return `/me rolled ${rolls.join(', ')}: [b]${endresult}[/b] (${results.join(', ')})`
    } else {
      return `/me rolled ${rolls.join(', ')}: [b]${endresult}[/b]`
    }
  },
  bottle({ target }) {
    return `/me spun the bottle. It landed on: ${target}`
  },
}

export function RLL(params: Params) {
  const {type, channel: id, character: name} = params
  const char = state.onlineCharacters[name]
  const message = rolltypes[type](name, params)
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

export function PRD({ character: name, key, value }: Params) {
  if (key && value) {
    const char = state.onlineCharacters[name]
    Vue.set(char.info, key, value)
  }
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
