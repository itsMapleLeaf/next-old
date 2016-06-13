<template>
  <div class='container'>
    <router-view></router-view>
  </div>
</template>

<script>
import store from '../vuex/store'

export default {
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
