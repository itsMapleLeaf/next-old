<template>
  <textarea class='textarea' v-model='message'
    @keydown.enter.prevent='submit' @keydown='shortcut($event)'>
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
@require 'layout'

.textarea
  padding: 0.3em 0.6em
  +animate(focus)
    background: theme-darker(40%)
</style>
