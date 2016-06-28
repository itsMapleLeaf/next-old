<template>
  <div class='overlay-shade flex-center'>
    <div class='overlay-panel text-align-center'>
      <h1>Login</h1>
      <form @submit.prevent='submit'>
        <input type="text" placeholder="Username"
        v-model="username" :disabled='disabled'><br>

        <input type="password" placeholder="Password"
        v-model="password" :disabled='disabled'><br>

        <button action="submit" :disabled='disabled'>Go</button>
      </form>
      <span>{{ status }}</span>
    </div>
  </div>
</template>

<style lang="stylus" scoped></style>

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
