<style lang='stylus' scoped>
@import 'theme'
@import 'tooltip'
@import 'layout'
@import 'animate'
@import 'form'

.container
  position: relative

.shortcut-info
  anchor(top right)
  font-size: 110%
  opacity: 0.3
  padding: 0 0.2em
  transition: 0.2s

  &:hover
    opacity: 1

.textarea
  display: block
  padding: 0.3em 0.6em
  size(100%)
</style>

<template>
  <div class='container'>
    <textarea class='textarea form-textarea' :value='value' :placeholder='placeholder'
      @input="$emit('input', $event.target.value)" @keydown='keydown($event)'>
    </textarea>
    <div class='shortcut-info tooltip-top' :data-tooltip='keyboardShortcuts'>
      <i class='mdi mdi-keyboard'></i>
    </div>
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
