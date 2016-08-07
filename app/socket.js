import {store, state} from './store'

export default {
  ws: null,

  connect () {
    this.ws = new window.WebSocket('wss://chat.f-list.net:9799')
    return this.ws
  },

  disconnect () {
    this.ws.close()
  },

  sendCommand (command, params) {
    const data = params ? `${command} ${JSON.stringify(params)}` : command
    this.ws.send(data)
    console.log(`Sent command: ${data}`)
  },

  handleCommand (command, params) {
    const handlers = {
      IDN () {
        console.info('Successfully identified with server.')
        store.setSocketState('identified')
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
        switch (params.action) {
          case 'init':
          case 'list':
            store.setIgnoreList(params.characters)
            break

          case 'add':
            store.addIgnored(params.character)
            break

          case 'delete':
            store.removeIgnored(params.character)
            break

          default:
            console.warn(`Unknown ignore action "${params.action}"`, params)
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
        if (params.character.identity === state.identity) {
          store.addChannelChat(params.channel, params.title)
        } else {
          store.addChannelCharacter(params.channel, params.character.identity)
        }
      },

      // someone left a channel
      // if it's us, remove that channel
      LCH () {
        store.removeChannelCharacter(params.channel, params.character)
        if (params.character === state.identity) {
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

      // channel message
      MSG () {
        store.addChannelMessage(params.channel, params.character, params.message, 'chat')
      },

      // LFRP message
      LRP () {
        store.addChannelMessage(params.channel, params.character, params.message, 'lfrp')
      },

      // private message
      PRI () {
        store.addPrivateMessage(params.character, params.character, params.message, 'chat')
      },

      VAR () {}
    }

    handlers[command]
      ? handlers[command].call(this)
      : console.warn(`Unknown command: ${command} ${JSON.stringify(params)}`)
  }
}
