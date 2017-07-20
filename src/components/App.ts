import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import Overlay from './Overlay.vue'
import Store from '../store'

type OverlayType = 'login' | 'characterSelect' | ''

@Component({
  components: { Login, Overlay, CharacterSelect },
})
export default class App extends Vue {
  store = new Store()

  loginStatus = ''
  overlays = [] as OverlayType[]

  created() {
    this.init()
  }

  destroyed() {
    this.store.chat.disconnect()
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
    const { account, ticket } = this.store.user
    this.store.chat.connect(account, ticket, identity, this.init)
    this.overlays.pop()
  }
}
