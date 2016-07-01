<template>
  <div class="ui scroll" v-el:container @scroll='onScroll'>
    <chat-message v-for='msg in messages'
    :character='msg.character'
    :message='msg.message'>
    </chat-message>
  </div>
</template>

<style lang="stylus" scoped>
.scroll
  padding: 0.3em 0em
</style>

<script>
import ChatMessage from './ChatMessage.vue'

export default {
  props: {
    messages: Array
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

  components: {
    ChatMessage
  }
}
</script>
