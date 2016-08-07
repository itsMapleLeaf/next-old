<template lang="jade">
textarea(v-model='message', :placeholder='placeholder', @keydown='submit')
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
      return `Chatting as ${this.state.identity}...`
    }
  },

  methods: {
    submit (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.$emit('message-sent', this.message)
        this.message = ''
      }
    }
  }
}
</script>
