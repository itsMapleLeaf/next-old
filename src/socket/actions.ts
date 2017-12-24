import { stores } from '../stores'
import { SocketCommand } from './SocketStore'

export function connectToServer(character: string) {
  const { account, ticket } = stores.appStore
  stores.socketStore.connect({
    account,
    ticket,
    character,
    onConnect,
    onDisconnect,
    onCommand,
  })
}

function onConnect() {
  stores.appViewStore.showChat()
}

function onDisconnect(reason: string) {
  stores.appViewStore.showLogin(reason)
}

function onCommand({ type, params }: SocketCommand) {
  console.log(type, params)
}
