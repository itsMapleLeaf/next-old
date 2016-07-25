<template>
  <div class='ui-shade flex-center'>
    <div class='ui-panel ui-text-center'>
      <h2 class='ui-margin-1'>Hello, gorgeous.</h2>
      <form @submit.prevent='submit'>
        <div class='ui-margin-1 ui-input-icon-left'>
          <i class='ui-icon mdi mdi-account-circle'></i>
          <input type='text' placeholder='Username' v-model='username' />
        </div>
        <div class='ui-margin-1 ui-input-icon-left'>
          <i class='ui-icon mdi mdi-lock'></i>
          <input type='password' placeholder='••••••••' v-model='password' />
        </div>
        <div class='ui-margin-1'>
          <checkbox v-model='remember'>Remember me</checkbox>
        </div>
        <div class='ui-margin-1'>
          <button class='ui-button' action='submit'>Go</button>
        </div>
      </form>
      <div class='ui-margin-1'>
        {{status}}
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import Checkbox from './Checkbox.vue'
import store from '../store'
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
  methods: {
    submit () {
      getTicket(this.username, this.password).then(ticket => {
        return this.store.fetchUserData(this.username, ticket)
      }).then(() => {
        this.store.popOverlay()
      }).catch(error => {
        this.status = error.toString()
        console.error(error)
      })
    }
  }
}
</script>
