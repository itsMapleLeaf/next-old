import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import Overlay from './Overlay.vue'
import * as api from '../lib/api'

type OverlayType = 'login' | 'characterSelect' | ''

@Component({
  components: { Login, Overlay, CharacterSelect },
})
export default class extends Vue {
  account = ''
  ticket = ''
  characters = [] as string[]
  loginStatus = ''
  overlays = [] as OverlayType[]

  created() {
    this.overlays.push('login')
  }

  async handleLoginSubmit(account: string, password: string) {
    this.account = account
    this.loginStatus = ''
    try {
      this.ticket = await api.fetchTicket(account, password)
      this.characters = await api.fetchCharacterList(account, this.ticket)
      this.overlays.pop()
      this.overlays.push('characterSelect')
    } catch (err) {
      this.loginStatus = err.toString()
    }
  }

  handleIdentitySubmit(identity: string) {
    this.overlays.pop()
  }
}
