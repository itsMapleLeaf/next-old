<template>
  <div class='flex-grow flex ui-fullscreen'>
    <user-menu class='flex-fixed ui-width-5 ui-desktop'></user-menu>
    <chat class='flex-grow'></chat>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import UserMenu from './UserMenu.vue'

export default {
  components: {Chat, UserMenu}
}
</script>
