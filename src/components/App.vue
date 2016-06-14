<template>
  <div class='container'>
    <chat></chat>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import store from '../vuex/store'

export default {
  components: {
    Chat
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
