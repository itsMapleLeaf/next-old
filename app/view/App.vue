<template>
  <div class='flex-grow flex ui-fullscreen'>
    <menu class='flex-fixed ui-width-5 ui-desktop'></menu>
    <chat class='flex-grow'></chat>
  </div>
</template>

<style lang="stylus" src="../styles.styl"></style>

<script>
import Chat from './Chat.vue'
import Menu from './UserMenu.vue'

export default {
  components: {Chat, Menu}
}
</script>
