<template lang='pug'>
.container
  login
</template>

<script>
import Login from './Login.vue'

export default {
  components: {
    Login
  },
  data () {
    return {
      remember: false
    }
  }
}
</script>
