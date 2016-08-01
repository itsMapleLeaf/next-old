<template lang='jade'>
.ui-overlay
  .ui-panel.ui-text-center
    h2.ui-margin-1 Hello, gorgeous.
    form.ui-width-6(@submit.prevent='submit')
      .ui-margin-1.ui-input-icon-left
        i.ui-icon.mdi.mdi-account-circle
        input(type='text', placeholder='Username', v-model='username')
      .ui-margin-1.ui-input-icon-left
        i.ui-icon.mdi.mdi-lock
        input(type='password', placeholder='••••••••', v-model='password')
      .ui-margin-1
        checkbox(v-model='remember') Remember me
      .ui-margin-1
        button.ui-button(action='submit') Go
    .ui-margin-1
      | {{status}}
</template>

<style></style>

<script>
import Checkbox from './Checkbox.vue'
import store from '../store'
import session from '../session'
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
      status: '',
      store
    }
  },
  mounted () {
    const data = session.load()
    if (data && data.account) {
      this.username = data.account
      this.remember = true
    }
  },
  methods: {
    submit () {
      getTicket(this.username, this.password).then(ticket => {
        if (this.remember) {
          session.data.account = this.username
          session.data.ticket = ticket
          session.save()
        } else {
          session.clear()
        }
        return this.store.fetchUserData(this.username, ticket)
      }).then(() => {
        this.store.popOverlay()
        this.store.pushOverlay('character-select')
      }).catch(error => {
        this.status = error.toString()
        console.error(error)
      })
    }
  }
}
</script>
