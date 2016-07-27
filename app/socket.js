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
    store.clearChannels()
    this.sendCommand('CHA')
    this.sendCommand('ORS')
  },

  joinChannel (channel) {
    this.sendCommand('JCH', { channel })
  },

  leaveChannel (channel) {
    this.sendCommand('LCH', { channel })
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

      // public channel list
      CHA () {
        const channels = params.channels.map(ch => ({ id: ch.name, name: ch.name, users: ch.characters }))
        store.addChannels(channels)
      },

      // private channel list
      ORS () {
        const channels = params.channels.map(ch => ({ id: ch.name, name: ch.title, users: ch.characters }))
        store.addChannels(channels)
      },

      // someone joined a channel
      // if it's us, add a new chat
      JCH () {
        if (params.character.identity === store.identity) {
          store.addChannelChat(params.channel, params.title)
        } else {
          store.addChannelCharacter(params.channel, params.character.identity)
        }
      },

      // someone left a channel
      // if it's us, remove that channel
      LCH () {
        store.removeChannelCharacter(params.channel, params.character)
        if (params.character === store.identity) {
          store.removeChannelChat(params.channel)
        }
      },

      // list of ops for a channel
      COL () {
        store.setChannelOps(params.channel, params.oplist)
      },

      // initial channel information
      ICH () {
        const names = params.users.map(user => user.identity)
        store.setChannelCharacters(params.channel, names)
        store.setChannelMode(params.channel, params.mode)
      },

      // channel description update
      CDS () {
        store.setChannelDescription(params.channel, params.description)
      },

      VAR () {}
    }

    handlers[command]
      ? handlers[command].call(this)
      : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
  }
}
