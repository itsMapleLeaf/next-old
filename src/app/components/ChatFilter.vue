<template>
  <Toggle class='tooltip-bottom' :value='disabled || value' @input="$emit('input', !value)" :disabled='disabled' :data-tooltip='tooltip'>
    <slot></slot>
  </Toggle>
</template>

<script>
import Toggle from './Toggle.vue'

export default {
  props: {
    value: Boolean,
    disabled: Boolean,
    tooltip: String,
  },
  components: {
    Toggle,
  },
}
</script>

<style lang='stylus' scoped>
@require 'elements/tooltip'
</style>
