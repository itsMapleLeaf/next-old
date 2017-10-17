import Vue, { ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import Chat from '@/components/chat/Chat.vue'
import { Store } from '@/store'

type AppView = {
  component: ComponentOptions<any>
  events: { [event: string]: (...args: any[]) => any }
}

@Component({
  components: {
    Chat,
  },
})
export default class App extends Vue {
  $store: Store
  view: AppView | null = null

  loginView = {
    component: Login,
    events: {
      submit: this.handleLoginSubmit,
    },
  }

  characterSelectView = {
    component: CharacterSelect,
    events: {
      submit: this.handleCharacterSubmit,
    },
  }

  created() {
    this.init()
  }

  async init() {
    try {
      await this.$store.dispatch('loadAuthData')
      await this.$store.dispatch('fetchCharacters')
      this.view = this.characterSelectView
    } catch (error) {
      this.view = this.loginView
    }
  }

  async handleLoginSubmit(account: string, password: string) {
    try {
      await this.$store.dispatch('fetchTicket', { account, password })
      await this.$store.dispatch('fetchCharacters')
      this.view = this.characterSelectView
      this.$store.dispatch('saveAuthData')
    } catch (error) {
      console.log(error)
    }
  }

  handleCharacterSubmit(character: string) {
    this.$store.commit('SET_IDENTITY', character)
    this.$store.dispatch('connectToServer', this.$store.state.user)
    this.view = null
  }
}
