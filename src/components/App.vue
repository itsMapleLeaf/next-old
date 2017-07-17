<template>
  <div>
    <login @submit="handleLoginSubmit"></login>
    {{ account }} {{ ticket }} {{ characters }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import * as api from '../lib/api'

@Component({
  components: { Login }
})
export default class extends Vue {
  account = ''
  ticket = ''
  characters = [] as string[]

  async handleLoginSubmit(account: string, password: string) {
    this.account = account
    this.ticket = await api.fetchTicket(account, password)
    this.characters = await api.fetchCharacterList(account, this.ticket)
  }
}
</script>
