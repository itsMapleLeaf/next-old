<template>
  <div class='container'>
    <login></login>
  </div>
</template>

<script>
import Login from './Login.vue'
import store from '../vuex/store'

export default {
  components: {
    Login
  },
  data () {
    return {}
  },
  store
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/variables'

.container
  position: fixed 0
  background: bg-color
</style>
