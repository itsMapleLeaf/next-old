<template>
  <div :class="{'ui-highlight-green': type === 'lfrp'}"
    :style="{ fontStyle: text.startsWith('/me') ? 'italic' : 'none' }">
    <character :character='sender'></character>
    <span class='ui-text-color message-text' v-html="parsedMessage | bbcode"></span>
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
import ChatMessage from '../types/ChatMessage'
import {bbcode} from '../modules/filters'

export default {
  components: {
    Character
  },

  props: {
    message: ChatMessage
  },

  computed: {
    text () { return this.message.message },
    sender () { return this.message.sender },
    type () { return this.message.type },

    parsedMessage () {
      return this.text.replace(/^\/me\s*/i, '')
    }
  },

  filters: {bbcode}
}
</script>
