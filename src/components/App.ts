import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import Overlay from './Overlay.vue'
import * as api from '../api'
import Store from '../store'

type OverlayType = 'login' | 'characterSelect' | ''

const serverURL = 'wss://chat.f-list.net:9799'

@Component({
  components: { Login, Overlay, CharacterSelect },
})
export default class App extends Vue {
  store = new Store()

  loginStatus = ''
  overlays = [] as OverlayType[]

  socket: WebSocket | void
  identity = ''
  joinedChannels = {}

  created() {
    this.init()
  }

  destroyed() {
    if (this.socket) this.socket.close()
  }

  async init() {
    try {
      await this.store.user.restoreAuthData()
      await this.store.user.fetchCharacterList()
      this.overlays.push('characterSelect')
    } catch (error) {
      this.overlays.push('login')
    }
  }

  async handleLoginSubmit(account: string, password: string) {
    this.loginStatus = ''
    try {
      await this.store.user.authenticate(account, password)
      await this.store.user.fetchCharacterList()
      this.overlays.pop()
      this.overlays.push('characterSelect')
    } catch (err) {
      this.loginStatus = err.toString()
    }
  }

  handleIdentitySubmit(identity: string) {
    this.identity = identity
    this.overlays.pop()
    this.connect()
  }

  connect() {
    const socket = (this.socket = new WebSocket(serverURL))

    socket.onopen = () => {
      this.sendCommand('IDN', {
        account: this.store.user.account,
        ticket: this.store.user.ticket,
        character: this.identity,
        cname: 'next',
        cversion: '0.1.0',
        method: 'ticket',
      })
    }

    socket.onclose = socket.onerror = () => {
      this.overlays.push('login')
    }

    socket.onmessage = msg => {
      const data = msg.data as string
      const cmd = data.slice(0, 3)
      const params = data.length > 3 ? JSON.parse(data.slice(4)) : {}
      this.handleSocketCommand(cmd, params)
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

  handleSocketCommand(cmd: string, params: any) {
    switch (cmd) {
      case 'IDN':
        console.info('Successfully connected to server.')
        break

      case 'CON':
        console.info(`There are currently ${params.count} users in chat.`)
        break

      case 'VAR':
        break

      case 'PIN':
        this.sendCommand('PIN')
        break

      default:
        console.log(cmd, params)
    }
  }
}
