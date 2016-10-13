<style lang='stylus' scoped>
@require 'vars'

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
    <slot></slot>
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
  mounted () {
    this.$nextTick(() => {
      const [{ elm }] = this.$slots.default
      elm.style.width = '100%'
      elm.style.height = '100%'
    })
  },
  methods: {
    keydown (event) {
      this.$emit('input', doBBCShortcut(this.value, event))
    },
  },
  computed: {
    keyboardShortcuts () {
      return `
        Ctrl + Shift + H - [sub][/sub]
        Ctrl + Shift + J - [sup][/sup]
        Ctrl + Shift + B - [b][/b]
        Ctrl + Shift + I - [i][/i]
        Ctrl + Shift + U - [u][/u]
        Ctrl + Shift + S - [s][/s]
      `.trim()
    },
  },
}
</script>
