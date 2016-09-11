<template lang="pug">
textarea(v-model='message', :placeholder='placeholder', @keydown='submit', :style="{ 'font-style': message ? 'normal' : 'italic' }")
</template>

<script>
import {state} from '../store.new'

export default {
  data () {
    return {
      message: '',
      state
    }
  },

  computed: {
    placeholder () {
      const chat = this.state.currentChat
      if (chat) {
        if (chat.type === 'channel') {
          return `Chatting in ${chat.name} as ${this.state.identity}...`
        } else if (chat.type === 'private') {
          return `Chatting with ${chat.partner.name} as ${this.state.identity}...`
        }
      }
    }
  },

  methods: {
    submit (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()
        this.$emit('submit', this.message)
        this.message = ''
      }
    }
  }
}
</script>
