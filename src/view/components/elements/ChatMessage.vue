<template>
  <div class="ui hover-darken"
  :class="{'highlight green': kind === 'lfrp'}"
  :style="{ fontStyle: text.startsWith('/me') ? 'italic' : 'none' }">
    <character :character='sender'></character>
    <span class='message-text' v-html="parsedMessage | bbcode"></span>
  </div>
</template>

<style lang="stylus" scoped>
div
  padding: 0.2em 0.5em

.message-text
  margin-left: 0.3em
  white-space: pre-wrap
</style>

<script>
import Character from './Character.vue'

export default {
  components: {
    Character
  },

  props: {
    message: Object
  },

  computed: {
    text () { return this.message.message },
    sender () { return this.message.character },
    kind () { return this.message.type },

    parsedMessage () {
      return this.message.message.replace(/^\/me\s*/i, '')
    }
  }
}
</script>
