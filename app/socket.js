import store from './store'
import meta from '../package.json'

export default {
  ws: null,

  // connection state
  // either: offline, connecting, online, identified
  state: 'offline',

  connect () {
    const ws = new window.WebSocket('wss://chat.f-list.net:9799')

    ws.onopen = () => {
      console.log('Socket opened')
      this.state = 'connected'
      this.identify()
    }

    ws.onclose = () => {
      console.log('Socket closed')
      this.state = 'offline'
    }

    ws.onerror = (err) => {
      console.error('Socket error:', err)
      this.state = 'offline'
    }

    ws.onmessage = (msg) => {
      const {data} = msg
      const command = data.substring(0, 3)
      const params = data.length > 3 ? JSON.parse(data.substring(4)) : {}

      this.handleCommand(command, params)
    }

    this.ws = ws
    this.state = 'connecting'
  },

  sendCommand (command, params) {
    const data = params ? `${command} ${JSON.stringify(params)}` : command
    this.ws.send(data)
    console.log(`Sent command: ${data}`)
  },

  identify () {
    this.sendCommand('IDN', {
      method: 'ticket',
      account: store.account,
      ticket: store.ticket,
      character: store.identity,
      cname: meta.name,
      cversion: meta.version
    })
  },

  handleCommand (command, params) {
    const handlers = {
      IDN () {
        console.info('Successfully identified with server.')
        this.state = 'identified'
      },

      HLO () { console.info(params.message) },
      CON () { console.info(`There are ${params.count} characters online.`) },
      PIN () { this.sendCommand('PIN') }
    }

    handlers[command]
      ? handlers[command]()
      : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
  }
}
