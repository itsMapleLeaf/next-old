<template>
  <main class="fullscreen bg-color-main text-color-main">
    <chat></chat>
    <renderer v-if="view" v-bind="view"></renderer>
  </main>
</template>

<script>
import Login from './Login'
import CharacterSelect from './CharacterSelect'
import Chat from './chat/Chat'

export default {
  components: {
    Chat
  },
  data() {
    return {
      view: null
    }
  },
  created() {
    this.createViews()
    this.init()
  },
  methods: {
    createViews() {
      this.loginView = {
        component: Login,
        events: {
          submit: this.handleLoginSubmit
        }
      }

      this.characterSelectView = {
        component: CharacterSelect,
        events: {
          submit: this.handleCharacterSubmit
        }
      }
    },

    async init() {
      try {
        await this.$store.dispatch('loadAuthData')
        await this.$store.dispatch('fetchCharacters')
        this.view = this.characterSelectView
      } catch (error) {
        this.view = this.loginView
      }
    },

    async handleLoginSubmit(account, password) {
      try {
        await this.$store.dispatch('fetchTicket', { account, password })
        await this.$store.dispatch('fetchCharacters')
        this.view = this.characterSelectView
        this.$store.dispatch('saveAuthData')
      } catch (error) {
        console.log(error)
      }
    },

    handleCharacterSubmit(character) {
      this.$store.commit('SET_IDENTITY', character)
      this.$store.dispatch('connectToServer', this.$store.state.user)
      this.view = null
    }
  },
}
</script>
