<template lang='pug'>
form.login-form(@submit.prevent='')
  fieldset
    h2 Hello, beautiful.
  fieldset
    .icon-input
      i.mdi.mdi-account-circle
      input(type='text', placeholder='Username')
  fieldset
    .icon-input
      i.mdi.mdi-lock
      input(type='password', placeholder='••••••••')
  fieldset
    button.button Go
  fieldset
    toggle(v-model="remember") Remember me
</template>

<script>
import Toggle from './Toggle.vue'

export default {
  components: {
    Toggle
  },
  data () {
    return {
      remember: false
    }
  }
}
</script>
