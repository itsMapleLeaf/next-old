<template lang="pug">
div(:style='style', :class='classes')
  small.ui-faded [{{ time }}]
  character.ui-label(:character='message.sender', style='margin-right: 0.3em')
  span(v-html='parsedMessage')
</template>

<script>
import Character from './Character.vue'
import Message from '../models/Message'

const meCommand = /^\/me/

function leftPad (input, len, char = ' ') {
  return char.repeat(len - input.toString().length) + input.toString()
}

export default {
  components: {
    Character
  },
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
      switch (this.message.type) {
        case 'friend':
          return 'highlight-blue'
        case 'lfrp':
          return 'highlight-green'
        case 'admin':
          return 'highlight-red'
        case 'self':
          return 'color-darker'
        default:
          return ''
      }
    },
    time () {
      const date = new Date(this.message.time)
      return `${date.getHours()}:${leftPad(date.getMinutes(), 2, '0')}`
    }
  }
}
</script>
