<template>
  <div>
    <div class='flex-grow flex ui-fullscreen'>
      <user-menu class='flex-fixed ui-width-5 ui-desktop'></user-menu>
      <chat class='flex-grow'></chat>
    </div>
    <component :is='state.overlays[state.overlays.length - 1]'></component>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import UserMenu from './UserMenu.vue'
import Login from './Login.vue'
import {state, pushOverlay} from '../store'

export default {
  components: {Chat, UserMenu, Login},

  data () {
    return {state}
  },

  mounted () {
    pushOverlay('login')
  }
}
</script>
