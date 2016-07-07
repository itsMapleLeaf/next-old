<template>
  <div class="ui theme-color main focus-lighten"
  contenteditable
  :maxlength="maxLength"
  :placeholder="placeholder"
  @keydown="fixContent($event)"
  @keydown.enter="submit($event)"
  v-el:textarea></div>
</template>

<style lang="stylus" scoped>
div
  height: 5em
  padding: 0.4em 0.6em
</style>

<script>
export default {
  props: {
    character: String,
    maxLength: {
      type: Number,
      default: Infinity
    }
  },

  computed: {
    placeholder () {
      if (!this.character) {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.character}...`
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
        this.$emit('chatbox-submit', this.content)
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
