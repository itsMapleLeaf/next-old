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
      scrollToBottom: true
    }
  },

  methods: {
    onScroll () {
      const {container} = this.$els
      this.scrollToBottom = container.scrollHeight - container.scrollTop === container.clientHeight
    }
  },

  computed: {
    filteredMessages () {
      return this.messages
    }
  },

  watch: {
    messages () {
      if (this.scrollToBottom) {
        const {container} = this.$els
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
</script>
