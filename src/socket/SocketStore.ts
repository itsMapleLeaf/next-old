export interface SocketCommand {
  type: string
  params: object
}

export interface ConnectOptions {
  account: string
  ticket: string
  character: string
  onConnect(): void
  onDisconnect(reason: string): void
  onCommand(command: SocketCommand): void
}

export class SocketStore {
  private socket: WebSocket | undefined = undefined

  connect(options: ConnectOptions) {
    const handleOpen = () => {
      this.sendCommand('IDN', {
        account: options.account,
        ticket: options.ticket,
        character: options.character,
        cname: APP_NAME,
        cversion: APP_VERSION,
        method: 'ticket',
      })
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event.data as string
      const type = data.slice(0, 3)
      const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}

      if (type === 'IDN') {
        options.onConnect()
      }

      if (type === 'ERR') {
        if (params.number === 4) {
          handleDisconnect(params.message)
        }
      }

      options.onCommand({ type, params })
    }

    const handleDisconnect = (reason: string) => {
      if (!this.socket) return
      options.onDisconnect(reason)
      this.socket.close()
      this.socket = undefined
    }

    this.socket = new WebSocket('wss://chat.f-list.net:9799')
    this.socket.addEventListener('open', handleOpen)
    this.socket.addEventListener('message', handleMessage)
    this.socket.addEventListener('close', event =>
      handleDisconnect('Socket closed. ' + event.reason),
    )
    this.socket.addEventListener('error', error => handleDisconnect('Socket error: ' + error))
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(undefined, 'Disconnected by user.')
    }
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
}
