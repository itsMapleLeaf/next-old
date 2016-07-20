<template>
  <div class="ui-scroll" v-el:container @scroll='onScroll'>
    <chat-message class="ui-division-border" v-for='msg in messages' :message='msg'></chat-message>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue'

export default {
  components: {ChatMessage},

  props: {
    messages: Array
  },

  vuex: {
    getters: {
      onlineCharacters: state => state.chat.characters
    }
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
      return this.messages
    }
  },

  watch: {
    'messages' () {
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
