<template>
  <textarea v-model='message' @keydown.enter.prevent='submit' @keydown='shortcut($event)'>
  </textarea>
</template>

<script>
import {doBBCShortcut} from '../lib/bbc'
import {jwerty} from 'jwerty'

export default {
  data() {
    return { message: '', undos: [], redos: [] }
  },
  methods: {
    submit() {
      this.$emit('submit', this.message)
      this.message = ''
    },
    shortcut(event) {
      if (jwerty.is('ctrl+z')) {
        event.preventDefault()

        const undo = this.undos.pop()
        if (undo) {
          this.message = undo
          this.redos.push(undo)
        }
      }
      else if (jwerty.is('ctrl+y')) {
        event.preventDefault()

        const redo = this.redos.pop()
        if (redo) {
          this.message = redo
          this.undos.push(redo)
        }
      }
      else {
        this.message = doBBCShortcut(this.message, event)
      }
    },
  },
  watch: {
    message(value) {
      this.undos.push(value)
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
