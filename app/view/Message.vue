<template>
  <div :style='style'>
    <small class='ui-faded'>[{{ time }}]</small>
    <character :character='message.sender' style='margin-right: 0.3rem'></character>
    <span v-html='parsedMessage'></span>
  </div>
</template>

<script>
import Character from './Character.vue'
import Message from '../models/Message'

const meCommand = /^\/me/

export default {
  components: {Character},

  props: {
    message: Message
  },

  computed: {
    parsedMessage () {
      return this.message.message.replace(meCommand, '')
    },

    style () {
      return {
        fontStyle: meCommand.test(this.message.message) ? 'italic' : 'initial'
      }
    },

    time () {
      return new Date(this.message.time).toLocaleTimeString()
    }
  }
}
</script>
