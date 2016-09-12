<template lang='pug'>
form.login-form(@submit.prevent='submit')
  fieldset
    h2 Hello, beautiful.
  fieldset
    .icon-input
      i.mdi.mdi-account-circle
      input(type='text', placeholder='Username', v-model='account')
  fieldset
    .icon-input
      i.mdi.mdi-lock
      input(type='password', placeholder='••••••••', v-model='password')
  fieldset
    toggle(v-model='remember') Remember me
  fieldset
    button.button(action='submit') Go
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
