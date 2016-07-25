<template>
  <div>
    <div class='flex-grow flex ui-fullscreen'>
      <user-menu class='flex-fixed ui-width-5 ui-desktop'></user-menu>
      <chat class='flex-grow'></chat>
    </div>
    <component :is='store.overlays[store.overlays.length - 1]'></component>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import UserMenu from './UserMenu.vue'
import Login from './Login.vue'
import store from '../store'

export default {
  components: {Chat, UserMenu, Login},

  data () {
    return { store }
  },

  mounted () {
    this.store.pushOverlay('login')
  }
}
</script>
