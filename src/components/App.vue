<template>
  <div>
    <overlay v-if="showLogin">
      <login @submit="handleLoginSubmit" :status="loginStatus"></login>
    </overlay>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import Overlay from './Overlay.vue'
import * as api from '../lib/api'

@Component({
  components: { Login, Overlay }
})
export default class extends Vue {
  account = ''
  ticket = ''
  characters = [] as string[]
  loginStatus = ''

  showLogin = false

  created() {
    this.showLogin = true
  }

  async handleLoginSubmit(account: string, password: string) {
    this.account = account
    this.loginStatus = ''
    try {
      this.ticket = await api.fetchTicket(account, password)
      this.characters = await api.fetchCharacterList(account, this.ticket)
      this.showLogin = false
    } catch (err) {
      this.showLogin = true
      this.loginStatus = err.toString()
    }
  }
}
</script>
