<template>
  <main class="fullscreen bg-color-main text-color-main">
    <Chat />
    <Login v-if="view === 'login'" @submit="handleLoginSubmit" />
    <CharacterSelect v-if="view === 'characterSelect'" :characters="store.auth.characters" @submit="handleCharacterSubmit" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from '@/components/Login.vue'
import CharacterSelect from '@/components/CharacterSelect.vue'
import Chat from '@/components/chat/Chat.vue'
import { Store } from '@/store.new/store'

export default Vue.extend({
  inject: ['store'],

  components: {
    Login,
    CharacterSelect,
    Chat,
  },

  data() {
    return {
      view: '',
      store: this.store as Store
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      try {
        await this.store.auth.loadAuthData()
        await this.store.auth.fetchCharacters()
        this.view = 'characterSelect'
      } catch (error) {
        this.view = 'login'
      }
    },

    async handleLoginSubmit(account: string, password: string) {
      try {
        await this.store.auth.fetchTicket(account, password)
        await this.store.auth.fetchCharacters()
        this.store.auth.saveAuthData()
        this.view = 'characterSelect'
      } catch (error) {
        console.log(error)
      }
    },

    handleCharacterSubmit(character: string) {
      this.$store.commit('SET_IDENTITY', character)
      this.$store.dispatch('connectToServer', this.store.auth)
      this.view = ''
    },
  }
})
</script>
