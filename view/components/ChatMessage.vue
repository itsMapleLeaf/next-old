<template>
  <div class='ui hover-darken' style="padding: 0.2em 0.5em"
  :style="{ fontStyle: message.startsWith('/me') ? 'italic' : 'none' }">
    <character :character='character'></character>
    <span style="margin-left: 0.3em" v-html="parsedMessage | bbcode"></span>
  </div>
</template>

<style lang="stylus" scoped></style>

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
