import { restoreJoinedChannels, saveJoinedChannels } from '../../channel/actions'
import { restorePrivateChats } from '../../private-chat/actions'
import { channelBrowserStore, channelStore, characterStore, chatStore, consoleStore, privateChatStore } from '../../stores'

type CommandHandler = {
  handleSocketCommand(cmd: string, params: any): void
}

type CommandHandlerTable = {
  [command: string]: CommandHandlerFunction | void
}

type CommandHandlerFunction = () => void

const commandHandlers: CommandHandler[] = [
  channelStore,
  privateChatStore,
  characterStore,
  channelBrowserStore,
]

let socket: WebSocket | void

export function connectToServer(
  account: string,
  ticket: string,
  character: string,
  connectedCallback: () => void,
  closedCallback: () => void,
) {
  disconnectFromServer()

  chatStore.setIdentity(character)

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

    commandHandlers.forEach(handler => {
      handler.handleSocketCommand(cmd, params)
    })

    handleSocketCommand(cmd, params)
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

export function handleSocketCommand(cmd: string, params: any) {
  const handlers: CommandHandlerTable = {
    PIN() {
      // dispatch('sendSocketCommand', { cmd: 'PIN' })
      sendSocketCommand('PIN')
    },

    IDN() {
      restoreJoinedChannels().catch(console.error)
      restorePrivateChats().catch(console.error)
    },

    HLO() {
      consoleStore.addMessage(params.message)
    },

    CON() {
      consoleStore.addMessage(`There are ${params.count} characters in chat.`)
    },

    FRL() {
      const friends = params.characters as string[]
      chatStore.setFriends(friends)
    },

    IGN() {
      const { action } = params
      if (action === 'init') {
        const characters = params.characters as string[]
        chatStore.setIgnored(characters)
      } else if (action === 'add') {
        chatStore.addIgnoredUser(params.character)
      } else if (action === 'delete') {
        chatStore.removeIgnoredUser(params.character)
      }
    },

    ADL() {
      const admins = params.ops as string[]
      chatStore.setAdmins(admins)
    },

    JCH() {
      if (params.character.identity === chatStore.identity) {
        channelStore.addJoinedChannel(params.channel)
        saveJoinedChannels().catch(console.error)
      }
    },

    LCH() {
      if (params.character === chatStore.identity) {
        channelStore.removeJoinedChannel(params.channel)
        saveJoinedChannels().catch(console.error)
      }
    },

    RTB() {
      // TODO
      // Friend Request: {type: 'friendadd', name: '...'}
      // Friend Request accepted: {type: 'trackrem(?)', name: '...'}
      // bookmark added
      // if (params.type === 'trackadd') commit('ADD_FRIEND', params.name)
      // bookmark removed
      // if (params.type === 'trackrem') commit('REMOVE_FRIEND', params.name)
    },
  }

  const handler = handlers[cmd]
  if (handler) handler()

  // console.log(cmd, params)
}
