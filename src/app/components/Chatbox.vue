<template lang="pug">
textarea(v-model='message', :placeholder='placeholder', @keydown='submit', :style="{ 'font-style': message ? 'normal' : 'italic' }")
</template>

<script>
import {state} from '../store'

export default {
  data () {
    return {
      message: '',
      state
    }
  },

  computed: {
    placeholder () {
      const room = this.state.currentRoom
      if (room.type === 'channel') {
        return `Chatting in ${room.name} as ${this.state.identity}...`
      } else if (room.type === 'private') {
        return `Chatting with ${room.partner.name} as ${this.state.identity}...`
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
