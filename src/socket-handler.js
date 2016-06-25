// import store from './vuex/store'
import {ChannelInfo, ChannelMode, ChannelStatus} from './types'
import {inspect} from 'util'

const urls = {
  mainInsecure: 'ws://chat.f-list.net:9722',
  main: 'wss://chat.f-list.net:9799',
  testInsecure: 'ws://chat.f-list.net:8722',
  test: 'ws://chat.f-list.net:8799'
}

class SocketHandler {
  constructor (vm) {
    this.vm = vm
  }

  connect (urlID) {
    if (this.ws) {
      this.ws.onClose = () => {}
      this.ws.close()
    }

    this.ws = new window.WebSocket(urls[urlID])

    this.ws.onopen = () => {
      this.sendIdentifyRequest()
    }

    this.ws.onclose = () => {
      const err = 'Lost connection to server. :('
      this.vm.socketError(err)
    }

    this.ws.onerror = err => {
      this.vm.socketError(err)
    }

    this.ws.onmessage = ({data}) => {
      const {command, params} = this.parseServerCommand(data)
      this.handleChatCommand(command, params)
    }
  }

  sendIdentifyRequest () {
    const {account, ticket, character} = this.vm.state.getUserData()
    const params = {
      account,
      ticket,
      character,
      method: 'ticket',
      cname: 'fchat-next',
      cversion: '0.1.0'
    }

    this.send('IDN', params)
  }

  parseServerCommand (payload) {
    const command = payload.substring(0, 3)
    const params = payload.length > 3 ? JSON.parse(payload.substring(4)) : {}
    return {command, params}
  }

  handleChatCommand (command, params) {
    const {state} = this.vm

    switch (command) {
      // identify with server
      case 'IDN':
        this.vm.socketIdentifySuccess()
        break

      /* ping~! */
      case 'PIN':
        /* pong~! */
        this.send('PIN')
        break

      // receiving server variables
      case 'VAR':
        state.setServerVariable(params.variable, params.value)
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
            state.setIgnoreList(params.characters)
            break

          default:
            console.warn(`Unknown ignore list action ${params.action}`)
        }
        break

      // receiving list of admins
      case 'ADL':
        state.setAdminList(params.ops)
        break

      // receiving all characters online
      // comes in multiple batches
      case 'LIS':
        state.hashCharacters(params.characters)
        break

      // character came online
      case 'NLN':
        state.addCharacter(params.identity, params.gender)
        break

      // character went offline
      case 'FLN':
        state.removeCharacter(params.character)
        break

      // character changed status
      case 'STA':
        const {character, status, statusmsg} = params
        state.setCharacterStatus(character, status, statusmsg)
        break

      // received list of public channels
      case 'CHA': {
        const toChannelInfo = ({ name, characters }) => ChannelInfo(name, name, characters)
        const list = params.channels.map(toChannelInfo)
        state.setPublicChannelList(list)
        break
      }

      // received list of private channels
      case 'ORS': {
        const toChannelInfo = ({ name, title, characters }) => ChannelInfo(name, title, characters)
        const list = params.channels.map(toChannelInfo)
        state.setPrivateChannelList(list)
        break
      }

      // receiving initial channel information
      case 'ICH':
        const namelist = params.users.map(({identity}) => identity)
        state.setChannelCharacters(params.channel, namelist)
        state.setChannelMode(params.channel, ChannelMode[params.mode])
        break

      // receiving a channel description
      case 'CDS':
        state.setChannelDescription(params.channel, params.description)
        break

      // user joined a channel (could be us)
      case 'JCH': {
        const { identity } = params.character
        state.addChannelCharacter(params.channel, identity)
        if (identity === state.getCharacter()) {
          state.setChannelStatus(params.channel, ChannelStatus.joined)
          this.vm.socketChannelJoined(params.channel)
        }
        break
      }

      // user left a channel (could be us)
      case 'LCH':
        state.removeChannelCharacter(params.channel, params.character)
        if (params.character === state.getCharacter()) {
          state.setChannelStatus(params.channel, ChannelStatus.left)
          this.vm.socketChannelLeft(params.channel)
        }
        break

      // channel message
      case 'MSG':
        state.addChannelMessage(params.channel, params.character, params.message)
        break

      // private message
      case 'PRI':
        state.addPrivateMessage(params.character, params.character, params.message)
        this.vm.privateMessageReceived(params.character, params.character, params.message)
        break

      default:
        console.warn(`Unknown command ${command} with params:\n`, inspect(params, { depth: null }))
    }
  }

  send (command, params) {
    if (params) {
      this.ws.send(`${command} ${JSON.stringify(params)}`)
      console.log('Sent command', command, inspect(params))
    } else {
      this.ws.send(command)
      console.log('Sent command', command)
    }
  }

  fetchChannelList () {
    this.send('CHA')
    this.send('ORS')
  }

  joinChannel (id) {
    this.send('JCH', { channel: id })
    this.vm.state.setChannelStatus(id, ChannelStatus.joining)
  }

  leaveChannel (id) {
    this.send('LCH', { channel: id })
    this.vm.state.setChannelStatus(id, ChannelStatus.leaving)
  }

  sendChannelMessage (channel, message) {
    this.send('MSG', { channel, message })
    this.vm.state.addChannelMessage(channel, this.vm.state.getCharacter(), message)
  }

  sendPrivateMessage (recipient, message) {
    this.send('PRI', { recipient, message })
    this.vm.state.addPrivateMessage(recipient, this.vm.state.getCharacter(), message)
  }
}

export default SocketHandler
