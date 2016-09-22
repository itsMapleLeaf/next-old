<template>
  <a class='toggle' href='#' :class='toggleClass' @click.prevent="$emit('input', !value)">
    <i class='mdi' :class='iconClass'></i> <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    value: Boolean,
    disabled: Boolean,
  },
  computed: {
    iconClass() {
      return this.value
        ? 'mdi-checkbox-marked-outline'
        : 'mdi-checkbox-blank-outline'
    },
    toggleClass() {
      return {
        checked: this.value,
        disabled: this.disabled,
      }
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'mixins/theme'

.toggle
  font-size: 90%
  opacity: 0.7
  border-bottom: 1px solid transparent

  +animate()
    opacity: 1
    border-bottom-color: rgba($text-color, 0.3)
  
  active-animation()

  &.checked
    opacity: 0.8

  &.disabled
    opacity: 0.3
    pointer-events: none
</style>
