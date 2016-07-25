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

  requestChannels () {
    this.sendCommand('CHA')
    this.sendCommand('ORS')
  },

  handleCommand (command, params) {
    const handlers = {
      IDN () {
        console.info('Successfully identified with server.')
        this.state = 'identified'
      },

      HLO () { console.info(params.message) },
      CON () { console.info(`There are ${params.count} characters online.`) },

      /* ping~! */
      PIN () {
        /* pong~! */
        this.sendCommand('PIN')
      },

      // ignored, we get friends from login
      FRL () {},

      IGN () {
        if (params.action === 'init') {
          store.setIgnoreList(params.characters)
        }
      },

      LIS () { store.addCharacterBatch(params.characters) },
      ADL () { store.setAdminList(params.ops) },
      NLN () { store.addCharacter(params.identity, params.gender) },
      FLN () { store.removeCharacter(params.character) },
      STA () { store.setCharacterStatus(params.character, params.status, params.statusmsg) },

      CHA () {
        const channels = params.channels.map(ch => ({ id: ch.name, name: ch.name, users: ch.characters }))
        store.addChannels(channels)
      },

      ORS () {
        const channels = params.channels.map(ch => ({ id: ch.name, name: ch.title, users: ch.characters }))
        store.addChannels(channels)
      },

      VAR () {}
    }

    handlers[command]
      ? handlers[command].call(this)
      : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
  }
}
