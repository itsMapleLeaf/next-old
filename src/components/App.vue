<template>
  <main class="fullscreen bg-color-main text-color-main">
    <Chat />
    <Login v-if="view === 'login'" @submit="handleLoginSubmit" />
    <CharacterSelect v-if="view === 'characterSelect'" @submit="handleCharacterSubmit" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Login from '@/components/Login.vue'
import CharacterSelect from '@/components/CharacterSelect.vue'
import Chat from '@/components/chat/Chat.vue'
import { Store } from '@/store'

@Component({
  components: {
    Chat,
    Login,
    CharacterSelect,
  },
})
export default class App extends Vue {
  $store: Store

  view = ''

  created() {
    this.init()
  }

  async init() {
    try {
      await this.$store.dispatch('loadAuthData')
      await this.$store.dispatch('fetchCharacters')
      this.view = 'characterSelect'
    } catch (error) {
      this.view = 'login'
    }
  }

  async handleLoginSubmit(account: string, password: string) {
    try {
      await this.$store.dispatch('fetchTicket', { account, password })
      await this.$store.dispatch('fetchCharacters')
      this.view = 'characterSelect'
      this.$store.dispatch('saveAuthData')
    } catch (error) {
      console.log(error)
    }
  }

  handleCharacterSubmit(character: string) {
    this.$store.commit('SET_IDENTITY', character)
    this.$store.dispatch('connectToServer', this.$store.state.user)
    this.view = ''
  }
}
</script>
