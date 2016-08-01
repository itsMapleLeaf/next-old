<template lang='jade'>
div(:style='style', :class='classes')
  small.ui-faded [{{ time }}]
  character(:character='message.sender', style='margin-right: 0.3rem')
  span(v-html='parsedMessage')
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

    classes () {
      return {
        'highlight-green': this.message.type === 'lfrp'
      }
    },

    time () {
      return new Date(this.message.time).toLocaleTimeString()
    }
  }
}
</script>
