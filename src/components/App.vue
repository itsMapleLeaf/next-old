<template>
  <main class="fullscreen bg-color-main text-color-main">
    <div v-if="appState === 'setup'">Setting things up...</div>
    <Login
      v-if="appState === 'login'"
      @submit="handleLoginSubmit"
    />
    <div v-if="appState === 'loggingIn'">Logging in...</div>
    <CharacterSelect
      v-if="appState === 'characterSelect'"
      :characters="characters"
      @submit="handleCharacterSubmit"
    />
    <div v-if="appState === 'connecting'">Connecting...</div>
    <Chat v-if="appState === 'online'" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from '@/components/Login.vue'
import CharacterSelect from '@/components/CharacterSelect.vue'
import Chat from '@/components/chat/Chat.vue'
import store from '@/store'

export default Vue.extend({
  components: {
    Login,
    CharacterSelect,
    Chat,
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
