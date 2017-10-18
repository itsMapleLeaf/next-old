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
import store from '@/store'

export default Vue.extend({
  components: {
    Login,
    CharacterSelect,
    Chat,
  },

  data() {
    return {
      view: '',
    }
  },

  computed: {
    store() {
      return store
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      try {
        await store.auth.loadAuthData()
        await store.auth.fetchCharacters()
        this.view = 'characterSelect'
      } catch (error) {
        this.view = 'login'
      }
    },

    async handleLoginSubmit(account: string, password: string) {
      try {
        await store.auth.fetchTicket(account, password)
        await store.auth.fetchCharacters()
        store.auth.saveAuthData()
        this.view = 'characterSelect'
      } catch (error) {
        console.log(error)
      }
    },

    handleCharacterSubmit(character: string) {
      store.chat.connectToServer(store.auth.account, store.auth.ticket, character)
      this.view = ''
    },
  }
})
</script>
