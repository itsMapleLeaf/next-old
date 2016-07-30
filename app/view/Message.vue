<template>
  <div :style='style'>
    <character :character='sender' style='margin-right: 0.3rem'></character>
    <span v-html='parsedMessage'></span>
  </div>
</template>

<script>
import Character from './Character.vue'
import CharacterModel from '../models/Character'

const meCommand = /^\/me/

export default {
  components: {Character},

  props: {
    sender: CharacterModel,
    message: String
  },

  computed: {
    parsedMessage () {
      return this.message.replace(meCommand, '')
    },

    style () {
      return {
        fontStyle: meCommand.test(this.message) ? 'italic' : 'initial'
      }
    }
  }
}
</script>
