<template>
  <div class='chat-message'
  :style="{ fontStyle: message.startsWith('/me') ? 'italic' : 'none' }">
    <character :character='character'></character>
    <span class='message'>{{{ parsedMessage | bbcode }}}</span>
  </div>
</template>

<script>
import Character from './Character.vue'

export default {
  components: {
    Character
  },

  props: {
    character: Object,
    message: String
  },

  computed: {
    parsedMessage () {
      return this.message.replace(/^\/me\s*/gi, '')
    }
  }
}
</script>

<style lang="stylus" scoped></style>
