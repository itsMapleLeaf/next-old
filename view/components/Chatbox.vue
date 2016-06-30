<template>
  <div
  contenteditable
  :maxlength="maxLength"
  :placeholder="placeholder"
  @keydown="fixContent($event)"
  @keydown.enter="submit($event)"
  v-el:textarea></div>
</template>

<style lang="stylus" scoped>
div
  padding: 0.4em 0.6em
</style>

<script>
import state from '../lib/state'
import {ChatboxSubmit} from '../lib/events'

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

    submit (event) {
      if (!event.shiftKey) {
        this.$dispatch(ChatboxSubmit, this.getContent())
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
