<template>
  <textarea style="resize: none" :placeholder="`Chatting as ${identity}...`" v-model="message" @keydown.enter.prevent="handleEnter"></textarea>
</template>

<script>
export default {
  data() {
    return { message: '' }
  },
  methods: {
    handleEnter(event) {
      const message = this.message.trim()
      if (message !== '') {
        this.$emit('submit', message)
      }
      this.message = ''
    },
  },
  computed: {
    identity() {
      return this.$store.state.chat.identity
    },
  },
}
</script>
