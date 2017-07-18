<template>
  <div>
    <overlay v-for="(overlay, i) in overlays" :key="i">
      <login v-if="overlay === 'login'" @submit="handleLoginSubmit" :status="loginStatus"></login>
    </overlay>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import Overlay from './Overlay.vue'
import * as api from '../lib/api'

type OverlayType = 'login' | 'character-select' | ''

@Component({
  components: { Login, Overlay }
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
    } catch (err) {
      this.loginStatus = err.toString()
    }
  }
}
</script>
