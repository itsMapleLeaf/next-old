import EventEmitter from 'events'
import {inspect} from 'util'
import {createChatMessage} from 'types/chat'
import type {ChannelInfo, ChatMessage} from 'types/chat'
import type {CharacterName, Character} from 'types/character'
import {Store} from 'modules/store'
import meta from 'modules/meta'

const {WebSocket} = window

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

    this.bus.once('open', () => this.store.dispatch('SocketConnectionSuccess'))
    this.bus.once('error', err => this.store.dispatch('SocketError', err))
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
        store.dispatch('SocketIdentifySuccess')
        break

      /* ping~! */
      case 'PIN':
        /* pong~! */
        this.send('PIN')
        break

      // receiving server variables
      case 'VAR':
        store.setServerVariable(params.variable, params.value)
        break

      // hello :)
      case 'HLO':
        console.info(params.message)
        break

      // receive # of characters online
      case 'CON':
        console.info(`There are ${params.count} characters online.`)
        break

      // receiving list of friends
      // we can ignore this, since we already got that from the login data
      case 'FRL': break

      // receiving ignore list action
      case 'IGN':
        switch (params.action) {
          case 'init':
            store.setIgnoreList(params.characters)
            break

          default:
            console.warn(`Unknown ignore list action ${params.action}`)
        }
        break

      // receiving list of admins
      case 'ADL':
        store.setAdminList(params.ops)
        break

      // receiving all characters online
      // comes in multiple batches
      case 'LIS':
        store.addCharacterBatch(params.characters)
        break

      // character came online
      case 'NLN':
        store.addCharacter(params.identity, params.gender)
        break

      // character went offline
      case 'FLN':
        store.removeCharacter(params.character)
        break

      // character changed status
      case 'STA':
        const {character, status, statusmsg} = params
        store.setCharacterStatus(character, status, statusmsg)
        break

      // received list of public channels
      case 'CHA': {
        const list: ChannelInfo[] = params.channels.map(ch => {
          return { id: ch.name, name: ch.name, userCount: ch.characters }
        })
        store.setPublicChannelList(list)
        break
      }

      // received list of private channels
      case 'ORS': {
        const list: ChannelInfo[] = params.channels.map(ch => {
          return { id: ch.name, name: ch.name, userCount: ch.characters }
        })
        store.setPrivateChannelList(list)
        break
      }

      // receiving initial channel information
      case 'ICH':
        const names: CharacterName[] = params.users.map(entry => entry.identity)
        store.setChannelCharacters(params.channel, names)
        store.setChannelMode(params.channel, params.mode)
        break

      // receiving a channel description
      case 'CDS':
        store.setChannelDescription(params.channel, params.description)
        break

      // user joined a channel (could be us)
      // received before the above two
      case 'JCH': {
        const {identity} = params.character
        if (identity === store.getUserCharacterName()) {
          store.openChannelChat(params.channel, params.title)
        }
        store.addChannelCharacter(params.channel, identity)
        break
      }

      // user left a channel (could be us)
      case 'LCH':
        if (params.character === store.getUserCharacterName()) {
          store.closeChannelChat(params.channel)
        } else {
          store.removeChannelCharacter(params.channel, params.character)
        }
        break

      // channel message
      case 'MSG': {
        const char: Character = store.getCharacter(params.character)
        const message: ChatMessage = createChatMessage(char, params.message, 'chat')
        store.addChannelMessage(params.channel, message)
        break
      }

      // LFRP channel message
      case 'LRP': {
        const char: Character = store.getCharacter(params.character)
        const message: ChatMessage = createChatMessage(char, params.message, 'lfrp')
        store.addChannelMessage(params.channel, message)
        break
      }

      // private message
      case 'PRI':
        // TODO: open a private chat if one doesn't exist
        store.addPrivateMessage(params.character, params.character, params.message)
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
