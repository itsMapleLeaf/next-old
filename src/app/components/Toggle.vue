<template>
  <a class='toggle' href='#' :class="value && 'toggle-checked'" @click.prevent="$emit('input', !value)">
    <i class='mdi' :class='iconClass'></i> <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    iconClass () {
      return this.value
        ? 'mdi-checkbox-marked-outline'
        : 'mdi-checkbox-blank-outline'
    }
  }
}
</script>

<style lang='stylus' scoped>
@require 'mixins/theme'

.toggle
  active-animation()
  font-size: 90%
  opacity: 0.5
  border-bottom: 1px solid transparent

  &.toggle-checked
    opacity: 0.8

  &:hover
    opacity: 1
    border-bottom-color: rgba($text-color, 0.3)
</style>
