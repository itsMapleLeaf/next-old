<template>
  <form class='login-form' @submit.prevent='submit'>
    <fieldset>
      <h2>Hello, beautiful.</h2>
    </fieldset>
    <fieldset>
      <div class='icon-input'>
        <i class='mdi mdi-account-circle'></i>
        <input type='text' placeholder='Username' v-model='account'/>
      </div>
    </fieldset>
    <fieldset>
      <div class='icon-input'>
        <i class='mdi mdi-lock'></i>
        <input type='password' placeholder='••••••••' v-model='password'/>
      </div>
    </fieldset>
    <fieldset>
      <toggle v-model='remember'>Remember me</toggle>
    </fieldset>
    <fieldset>
      <button class='button' action='submit'>Go</button>
    </fieldset>
  </form>
</template>

<style lang='stylus' scoped>
.login-form
  text-align: center
</style>

<script>
import Toggle from './Toggle.vue'

export default {
  components: {
    Toggle
  },
  data () {
    return {
      account: '',
      password: '',
      remember: false
    }
  },
  methods: {
    submit () {
      this.$emit('login-submit', this.account, this.password, this.remember)
    }
  }
}
</script>
