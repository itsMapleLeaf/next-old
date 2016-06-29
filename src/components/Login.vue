<template>
  <div class='ui overlay'>
    <div class='ui panel'>
      <h1>Login</h1>
      <form class='ui form' @submit.prevent='submit'>
        <div class='ui field text-input icon left'>
          <i class='fa fa-user'></i>
          <input type="text" placeholder="Username" v-model="username" :disabled='disabled'>
        </div>
        <div class='ui field text-input icon left'>
          <i class='fa fa-lock'></i>
          <input type="password" placeholder="Password" v-model="password" :disabled='disabled'>
        </div>
        <div class='field'>
          <label>
            <input type='checkbox' tabindex='0' /> Remember me
          </label>
        </div>
        <div class='field'>
          <button class='ui button' action="submit" :disabled='disabled'>Go</button>
        </div>
      </form>
      <span>{{status}}</span>
    </div>
  </div>
</template>

<style lang="stylus">

</style>

<script>
import {sendLoginRequest} from '../flist'

const errorMessage = `
Could not connect to F-List website.
They're either doing maintenance, or someone spilled coke on the servers again.`

export default {
  data () {
    return {
      username: '',
      password: '',
      status: '',
      disabled: false
    }
  },

  methods: {
    submit () {
      sendLoginRequest(this.username, this.password)
      .then(data => {
        this.$emit('login-success', data)
      })
      .catch(err => {
        this.status = err || errorMessage
      })
      .then(() => {
        this.disabled = false
        this.password = ''
      })

      this.$emit('login-request', this.username)
      this.disabled = true
    }
  }
}
</script>
