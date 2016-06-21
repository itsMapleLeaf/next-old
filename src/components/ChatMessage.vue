<template>
  <div class='chat-message'>
    <character :character='character'></character>
    <span class='message'>{{message}}</span>
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
  }
}
</script>

<style lang="stylus" scoped>
.chat-message
  padding: 0.2em 0.5em

.message
  margin-left: 0.5em
</style>
