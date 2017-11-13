import {
  restoreJoinedChannels,
  saveJoinedChannels,
  handleChannelSocketCommand,
} from 'src/channel/actions'
import { restorePrivateChats, handlePrivateChatSocketCommand } from 'src/private-chat/actions'
import * as stores from 'src/stores'
import { handleCharacterSocketCommand } from 'src/character/actions'
import { handleChannelBrowserSocketCommand } from 'src/channel-browser/actions'

let socket: WebSocket | void

export function connectToServer(
  account: string,
  ticket: string,
  character: string,
  connectedCallback: () => void,
  closedCallback: () => void,
) {
  disconnectFromServer()

  stores.chatStore.setIdentity(character)

  socket = new WebSocket('wss://chat.f-list.net:9799')

  const handleOpen = () => {
    const params = {
      account,
      ticket,
      character,
      cname: APP_NAME,
      cversion: APP_VERSION,
      method: 'ticket',
    }
    sendSocketCommand('IDN', params)
  }

  const handleMessage = (msg: MessageEvent) => {
    const data = msg.data
    const cmd = data.slice(0, 3)
    const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}

    if (cmd === 'IDN') {
      connectedCallback()
    }

    const handlers = [
      handleChannelSocketCommand,
      handleChatSocketCommand,
      handlePrivateChatSocketCommand,
      handleCharacterSocketCommand,
      handleChannelBrowserSocketCommand,
    ]

    handlers.forEach(handleCommand => {
      handleCommand(cmd, params)
    })
  }

  const handleClose = () => {
    disconnectFromServer()
    closedCallback()
  }

  socket.addEventListener('open', handleOpen)
  socket.addEventListener('message', handleMessage)
  socket.addEventListener('close', handleClose)
  socket.addEventListener('error', handleClose)
}

export function disconnectFromServer() {
  if (socket) socket.close()
  socket = undefined
}

export function sendSocketCommand(cmd: string, params?: object) {
  if (socket) {
    if (params) {
      socket.send(cmd + ' ' + JSON.stringify(params))
    } else {
      socket.send(cmd)
    }
  }
}

export function handleChatSocketCommand(cmd: string, params: any) {
  if (cmd === 'PIN') {
    sendSocketCommand('PIN')
  }

  if (cmd === 'IDN') {
    restoreJoinedChannels().catch(console.error)
    restorePrivateChats().catch(console.error)
  }

  if (cmd === 'HLO') {
    stores.consoleStore.addMessage(params.message)
  }

  if (cmd === 'CON') {
    stores.consoleStore.addMessage(`There are ${params.count} characters in chat.`)
  }

  if (cmd === 'FRL') {
    const friends = params.characters as string[]
    stores.chatStore.setFriends(friends)
  }

  if (cmd === 'IGN') {
    const { action } = params
    if (action === 'init') {
      const characters = params.characters as string[]
      stores.chatStore.setIgnored(characters)
    } else if (action === 'add') {
      stores.chatStore.addIgnoredUser(params.character)
    } else if (action === 'delete') {
      stores.chatStore.removeIgnoredUser(params.character)
    }
  }

  if (cmd === 'ADL') {
    const admins = params.ops as string[]
    stores.chatStore.setAdmins(admins)
  }

  if (cmd === 'JCH') {
    if (params.character.identity === stores.chatStore.identity) {
      stores.channelStore.addJoinedChannel(params.channel)
      saveJoinedChannels().catch(console.error)
    }
  }

  if (cmd === 'LCH') {
    if (params.character === stores.chatStore.identity) {
      stores.channelStore.removeJoinedChannel(params.channel)
      saveJoinedChannels().catch(console.error)
    }
  }

  if (cmd === 'RTB') {
    // TODO
    // Friend Request: {type: 'friendadd', name: '...'}
    // Friend Request accepted: {type: 'trackrem(?)', name: '...'}
    // bookmark added
    // if (params.type === 'trackadd') commit('ADD_FRIEND', params.name)
    // bookmark removed
    // if (params.type === 'trackrem') commit('REMOVE_FRIEND', params.name)
  }
}
