<template>
  <div class="ui-scroll" v-el:container @scroll='onScroll'>
    <chat-message v-for='msg in filteredMessages' :message='msg'></chat-message>
  </div>
</template>

<style lang="stylus" scoped></style>

<script>
import ChatMessage from './ChatMessage.vue'
import ChannelState from '../types/ChannelState'

export default {
  props: {
    state: ChannelState
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

  methods: {
    onScroll () {
      const {container} = this.$els
      this.scroll = container.scrollTop
      this.scrollMax = container.scrollHeight - container.clientHeight
    }
  },

  computed: {
    filteredMessages () {
      return this.state.messages
    }
  },

  watch: {
    'state.messages' () {
      const {container} = this.$els
      const {scrollTop, scrollHeight, clientHeight} = container
      const scroll = scrollTop
      const scrollMax = scrollHeight - clientHeight

      if (this.scroll === this.scrollMax) {
        container.scrollTop = scrollMax
      }

      this.scroll = scroll
      this.scrollMax = scrollMax
    }
  }
}
</script>
