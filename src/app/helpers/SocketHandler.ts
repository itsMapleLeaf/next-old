import { bind } from 'decko'

interface SocketHandlerEvents {
  onConnect(): void
  onDisconnect(reason: string): void
  onCommand(command: SocketCommand): void
}

export interface SocketCommand {
  type: string
  params: object
}

export class SocketHandler {
  private socket: WebSocket | undefined = undefined

  constructor(private events: SocketHandlerEvents) {}

  connect(account: string, ticket: string, character: string) {
    const handleOpen = () => {
      this.sendCommand('IDN', {
        account,
        ticket,
        character,
        cname: APP_NAME,
        cversion: APP_VERSION,
        method: 'ticket',
      })
    }

    this.socket = new WebSocket('wss://chat.f-list.net:9799')
    this.socket.addEventListener('open', handleOpen)
    this.socket.addEventListener('message', this.handleMessage)
    this.socket.addEventListener('close', () => this.handleDisconnect('Socket closed.'))
    this.socket.addEventListener('error', error => this.handleDisconnect('Socket error: ' + error))
  }

  sendCommand(cmd: string, params?: object) {
    if (this.socket) {
      if (params) {
        this.socket.send(cmd + ' ' + JSON.stringify(params))
      } else {
        this.socket.send(cmd)
      }
    }
  }

  @bind
  private handleMessage(event: MessageEvent) {
    const data = event.data as string
    const type = data.slice(0, 3)
    const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}

    if (type === 'IDN') {
      this.events.onConnect()
    }

    if (type === 'ERR') {
      if (params.number === 4) {
        this.handleDisconnect(params.message)
      }
    }

    this.events.onCommand({ type, params })
  }

  @bind
  private handleDisconnect(reason: string) {
    if (!this.socket) return
    this.events.onDisconnect(reason)
    this.socket.close()
    this.socket = undefined
  }
}
