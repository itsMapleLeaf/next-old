<template>
  <div class="ui scroll" v-el:container @scroll='onScroll'>
    <chat-message v-for='msg in filteredMessages' :message='msg'></chat-message>
  </div>
</template>

<style lang="stylus" scoped>
.scroll
  padding: 0.3em 0em
</style>

<script>
import ChatMessage from './ChatMessage.vue'

import {ChatMessageType} from '../../lib/types'

export default {
  props: {
    messages: Array,
    preference: String
  },

  components: {
    ChatMessage
  },

  data () {
    return {
      scroll: 0,
      scrollMax: 0
    }
  },

  ready () {
    this.$watch('messages', () => {
      const {container} = this.$els
      const {scrollTop, scrollHeight, clientHeight} = container
      const scroll = scrollTop
      const scrollMax = scrollHeight - clientHeight

      if (this.scroll === this.scrollMax) {
        container.scrollTop = scrollMax
      }

      this.scroll = scroll
      this.scrollMax = scrollMax
    })
  },

  methods: {
    onScroll () {
      const {container} = this.$els
      this.scroll = container.scrollTop
      this.scrollMax = container.scrollHeight - container.clientHeight
    }
  },

  computed: {
    filteredMessages () {
      if (this.preference === 'both') {
        return this.messages
      } else if (this.preference === 'chat') {
        return this.messages.filter(msg => msg.type === ChatMessageType.chat)
      } else if (this.preference === 'ads') {
        return this.messages.filter(msg => msg.type === ChatMessageType.lfrp)
      }
    }
  }
}
</script>
