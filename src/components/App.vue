<template>
  <main class="fullscreen bg-color-main text-color-main">
    <Loading v-if="appState === 'setup'">Setting things up...</Loading>
    <Login
      v-if="appState === 'login'"
      @submit="handleLoginSubmit"
    />
    <Loading v-if="appState === 'loggingIn'">Logging in...</Loading>
    <CharacterSelect
      v-if="appState === 'characterSelect'"
      :characters="characters"
      @submit="handleCharacterSubmit"
    />
    <Loading v-if="appState === 'connecting'">Connecting...</Loading>
    <Chat v-if="appState === 'online'" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import CharacterSelect from './CharacterSelect.vue'
import Chat from './chat/Chat.vue'
import Loading from './Loading.vue'
import Login from './Login.vue'

import store from '@/store'

export default Vue.extend({
  components: {
    CharacterSelect,
    Chat,
    Loading,
    Login,
  },

  data() {
    return {
      appState: '',
    }
  },

  computed: {
    characters(): string[] {
      return store.auth.characters
    },
  },

  created() {
    store.chat.disconnectFromServer()
    this.init()
  },

  methods: {
    async init() {
      this.appState = 'setup'
      try {
        await store.auth.loadAuthData()
        await store.auth.fetchCharacters()
        this.appState = 'characterSelect'
      } catch (error) {
        this.appState = 'login'
      }
    },

    async handleLoginSubmit(account: string, password: string) {
      this.appState = 'loggingIn'
      try {
        await store.auth.fetchTicket(account, password)
        await store.auth.fetchCharacters()
        store.auth.saveAuthData()
        this.appState = 'characterSelect'
      } catch (error) {
        console.log(error)
      }
    },

    handleCharacterSubmit(character: string) {
      this.appState = 'connecting'

      store.chat.connectToServer(
        store.auth.account,
        store.auth.ticket,
        character,
        this.handleConnection,
        this.handleDisconnect,
      )
    },

    handleConnection() {
      this.appState = 'online'
    },

    handleDisconnect() {
      this.init()
    },
  },
})
</script>
