<template>
  <div class='shade box center'>
    <div class='panel'>
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

<script>
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
      const url = 'https://www.f-list.net/json/getApiTicket.php'

      const data = {
        account: this.username,
        password: this.password
      }

      this.$http.post(url, data)
      .then(res => {
        this.$emit('login-success', res.data)
      })
      .catch(err => {
        this.status = err || "Could not connect to F-List website. They're either doing maintenance, or someone spilled coke on the servers again."
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
