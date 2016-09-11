<template lang="pug">
.ui-overlay
  .ui-panel.ui-text-center
    h2.ui-margin-1 Hello, gorgeous.
    form.ui-width-6(@submit.prevent='submit')
      .ui-margin-1.ui-input-icon-left
        input(type='text', placeholder='Username', v-model='username')
        i.ui-icon.mdi.mdi-account-circle
      .ui-margin-1.ui-input-icon-left
        input(type='password', placeholder='••••••••', v-model='password')
        i.ui-icon.mdi.mdi-lock
      .ui-margin-1
        checkbox(v-model='remember') Remember me
      .ui-margin-1
        button.ui-button(action='submit') Go
    .ui-margin-1 {{ status }}
</template>

<script>
import Checkbox from './Checkbox.vue'
import * as store from '../store.new'
import * as session from '../session'
import {getTicket} from '../f-list'

export default {
  components: {
    Checkbox
  },
  data () {
    return {
      username: '',
      password: '',
      remember: false,
      status: ''
    }
  },
  created () {
    this.username = session.getStorageItem('account') || ''
    this.remember = session.isStorageEnabled()
  },
  methods: {
    submit () {
      getTicket(this.username, this.password).then(ticket => {
        if (this.remember) {
          session.enableStorage()
          session.setStorageItem('account', this.username)
          session.setStorageItem('ticket', ticket)
        } else {
          session.disableStorage()
        }
        return store.fetchUserData(this.username, ticket)
      }).then(() => {
        store.popOverlay()
        store.pushOverlay('character-select')
      }).catch(error => {
        this.status = error.toString()
        console.error(error)
      })
    }
  }
}
</script>
