import EventEmitter from 'events'
import {inspect} from 'util'
import {createChatMessage} from 'modules/constructors'
import {Store} from 'modules/store'
import CharacterBatch from 'modules/character-batch'
import meta from 'modules/meta'

import type {
  ChannelInfo, ChatMessage, ChannelID, ChannelMode,
  CharacterName, Character, CharacterStatus
} from 'modules/types'

const {WebSocket} = window

const batch = new CharacterBatch()

export class Socket {
  ws: WebSocket | null
  store: Store | null
  bus: EventEmitter

  constructor () {
    // use an event bus to handle WS commands for some convenience,
    // like using .once() and such
    this.bus = new EventEmitter()
    this.ws = null
    this.store = null
  }

  setStore (store) {
    this.store = store
  }

  connect (address) {
    this.ws = new WebSocket(address)

    this.ws.onopen = () => this.bus.emit('open')
    this.ws.onclose = () => this.bus.emit('close')
    this.ws.onmessage = msg => this.bus.emit('message', msg)
    this.ws.onerror = err => this.bus.emit('error', err)

    this.bus.on('message', msg => {
      const {type, params} = this.parseServerCommand(msg.data)
      this.handleServerCommand(type, params)
    })

    this.bus.once('open', () => this.store.dispatchEvent('SocketConnectionSuccess'))
    this.bus.once('error', err => this.store.dispatchEvent('SocketError', err))
  }

  identify (account, ticket, character) {
    const params = {
      account, ticket, character,
      method: 'ticket',
      cname: meta.name,
      cversion: meta.version
    }

    this.send('IDN', params)
  }

  parseServerCommand (command) {
    const type = command.substring(0, 3)
    const params = command.length > 3 ? JSON.parse(command.substring(4)) : {}
    return {type, params}
  }

  send (command: string, params?: Object) {
    const message = params ? `${command} ${JSON.stringify(params)}` : command
    this.ws.send(message)
    console.log('Sent socket message:', message)
  }

  handleServerCommand (type, params) {
    const {store} = this

    switch (type) {
      // successful identification w/ chat server
      case 'IDN':
        store.dispatchEvent('SocketIdentifySuccess')
        break

      /* ping~! */
      case 'PIN':
        /* pong~! */
        this.send('PIN')
        break

      // receiving server variables
      case 'VAR':
        store.dispatch({ type: 'ServerVariable', key: params.variable, value: params.value })
        break

      // hello :)
      case 'HLO':
        console.info(params.message)
        break

      // receive # of characters online
      case 'CON':
        console.info(`There are ${params.count} characters online.`)
        batch.setCount(params.count)
        break

      // receiving list of friends
      // we can ignore this, since we already got that from the login data
      case 'FRL': break

      // receiving ignore list action
      case 'IGN':
        switch (params.action) {
          case 'init':
            store.dispatch({ type: 'IgnoreList', ignored: params.characters })
            break

          default:
            console.warn(`Unknown ignore list action ${params.action}`)
        }
        break

      // receiving list of global admins
      case 'ADL':
        store.dispatch({ type: 'AdminList', admins: params.ops })
        break

      // receiving all characters online
      // comes in multiple batches
      case 'LIS':
        if (batch.addBatch(params.characters)) {
          store.dispatch({ type: 'CharacterBatch', batch: batch.items })
          batch.items = []
        }
        break

      // character came online
      case 'NLN':
        store.dispatch({ type: 'CharacterOnline', name: params.identity, gender: params.gender })
        break

      // character went offline
      case 'FLN':
        store.dispatch({ type: 'CharacterOffline', name: params.character })
        break

      // character changed status
      case 'STA': {
        const name: CharacterName = params.character
        const status: CharacterStatus = { state: params.status, message: params.statusmsg }
        store.dispatch({ type: 'CharacterStatus', name, status })
        break
      }

      // received list of public channels
      case 'CHA': {
        const channels: ChannelInfo[] = params.channels.map(ch => {
          return { id: ch.name, name: ch.name, userCount: ch.characters }
        })
        store.dispatch({ type: 'PublicChannelList', channels })
        break
      }

      // received list of private channels
      case 'ORS': {
        const channels: ChannelInfo[] = params.channels.map(ch => {
          return { id: ch.name, name: ch.name, userCount: ch.characters }
        })
        store.dispatch({ type: 'PrivateChannelList', channels })
        break
      }

      // receiving initial channel information
      case 'ICH': {
        const id: ChannelID = params.channel
        const mode: ChannelMode = params.mode
        const names: CharacterName[] = params.users.map(entry => entry.identity)
        store.dispatch({ type: 'ChannelCharacters', id, names })
        store.dispatch({ type: 'ChannelMode', id, mode })
        break
      }

      // receiving a channel description
      case 'CDS': {
        const { channel: id, description } = params
        store.dispatch({ type: 'ChannelDescription', id, description })
        break
      }

      // user joined a channel (could be us)
      // received before the above two
      case 'JCH': {
        const {identity: name} = params.character
        const {channel: id, title} = params
        if (name === store.getUserCharacterName()) {
          store.dispatch({ type: 'ChannelJoined', id, name: title })
        }
        store.dispatch({ type: 'ChannelCharacterJoined', id, name })
        break
      }

      // user left a channel (could be us)
      case 'LCH':
        if (params.character === store.getUserCharacterName()) {
          store.dispatch({ type: 'ChannelLeft', id: params.channel })
        } else {
          store.dispatch({ type: 'ChannelCharacterLeft', id: params.channel, name: params.character })
        }
        break

      // channel message
      case 'MSG': {
        const id: ChannelID = params.channel
        const char: Character = store.getCharacter(params.character)
        const message: ChatMessage = createChatMessage(char, params.message, 'chat')
        store.dispatch({ type: 'ChannelMessage', id, message })
        break
      }

      // LFRP channel message
      case 'LRP': {
        const id: ChannelID = params.channel
        const char: Character = store.getCharacter(params.character)
        const message: ChatMessage = createChatMessage(char, params.message, 'lfrp')
        store.dispatch({ type: 'ChannelMessage', id, message })
        break
      }

      // private message
      case 'PRI':
        // TODO: open a private chat if one doesn't exist
        store.dispatch({ type: 'PrivateChatMessage', partner: params.character, sender: params.character, message: params.message })
        break

      default:
        console.log(`Unknown socket message "${type}"\n${inspect(params)}`)
    }
  }
}

export const servers = {
  mainInsecure: 'ws://chat.f-list.net:9722',
  main: 'wss://chat.f-list.net:9799',
  testInsecure: 'ws://chat.f-list.net:8722',
  test: 'ws://chat.f-list.net:8799'
}

export const socket = new Socket()
