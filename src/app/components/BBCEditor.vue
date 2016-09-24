<style lang='stylus' scoped>
@import 'theme'
@import 'tooltip'
@import 'layout'
@import 'animate'

.container
  position: relative

.shortcut-info
  font-size: 110%
  opacity: 0.5
  padding: 0.2em
  anchor(top right)
  +animate(hover)
    opacity: 1

.textarea
  display: block
  padding: 0.3em 0.6em
  size(100%)
  +animate(focus)
    background: theme-darker(40%)
</style>

<template>
  <div class='container'>
    <textarea class='textarea' :value='value' :placeholder='placeholder'
      @input="$emit('input', $event.target.value)" @keydown='keydown($event)'>
    </textarea>
    <a class='shortcut-info tooltip-top' :data-tooltip='keyboardShortcuts' href='#'>
      <i class='mdi mdi-keyboard'></i>
    </a>
  </div>
</template>

<script>
import {doBBCShortcut} from '../lib/bbc'

export default {
  props: {
    value: String,
    placeholder: String,
  },
  methods: {
    keydown(event) {
      this.$emit('input', doBBCShortcut(this.value, event))
    },
  },
  computed: {
    keyboardShortcuts() {
      return `
        Ctrl + Alt + H - [sub][/sub]
        Ctrl + Alt + B - [b][/b]
        Ctrl + Alt + I - [i][/i]
        Ctrl + Alt + U - [u][/u]
      `.trim()
    },
  },
}
</script>
