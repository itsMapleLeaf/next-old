<template lang="jade">
div(:style='style', :class='classes')
  small.ui-faded [{{ time }}]
  character.ui-label(:character='message.sender', style='margin-right: 0.3em')
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
      const {type, sender} = this.message
      return sender.isFriend || sender.isBookmark ? 'highlight-blue'
        : type === 'lfrp' ? 'highlight-green'
        : type === 'admin' ? 'highlight-red'
        : type === 'self' ? 'color-darker'
        : ''
    },

    time () {
      const date = new Date(this.message.time)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `${hours}:${'0'.repeat(2 - minutes.toString().length) + minutes}`
    }
  }
}
</script>
