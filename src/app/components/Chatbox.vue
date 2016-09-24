<template>
  <textarea @keydown.enter.prevent='submit' @keydown='shortcut($event)' v-model='message'>
  </textarea>
</template>

<script>
import {doBBCShortcut} from '../lib/bbc'

export default {
  data() {
    return { message: '' }
  },
  methods: {
    submit() {
      this.$emit('submit', this.message)
      this.message = ''
    },
    shortcut(event) {
      this.message = doBBCShortcut(this.message, event)
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'theme'
@require 'animate'

textarea
  padding: 0.3em 0.6em
  +animate(focus)
    background: theme-darker(40%)
</style>
