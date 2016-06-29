<template>
  <div
  contenteditable
  :maxlength="maxLength"
  :placeholder="placeholder"
  @keydown="fixContent($event)"
  @keydown.enter="messageSent($event)"
  v-el:textarea></div>
</template>

<style lang="stylus" scoped>
div
  padding: 0.4em 0.6em
</style>

<script>
import state from '../state'

export default {
  props: {
    maxLength: {
      type: Number,
      default: Infinity
    }
  },

  data () {
    return { state }
  },

  computed: {
    placeholder () {
      if (this.state.getUserCharacterName() === '') {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.state.getUserCharacterName()}...`
      }
    }
  },

  methods: {
    getContent () {
      return this.$els.textarea.innerText.trim()
    },

    setContent (text) {
      this.$els.textarea.innerText = text
    },

    messageSent (event) {
      if (!event.shiftKey) {
        this.$emit('message-sent', this.getContent())
        this.setContent('')
        event.preventDefault()
      }
    },

    fixContent (event) {
      const content = this.getContent()
      if (content.length >= this.maxLength && (event.code !== 'Backspace' && event.code !== 'Enter')) {
        event.preventDefault()
      }
    }
  }
}
</script>
