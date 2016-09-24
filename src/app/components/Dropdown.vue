<template>
  <div class='dropdown'>
    <a href='#' class='current' @click='open = !open'>
      <i class='mdi mdi-chevron-down'></i>
      {{ currentLabel }}
    </a>
    <transition name='fade'>
      <div class='option-list' v-if='open'>
        <a href='#' class='option' v-for='opt in options' @click='setValue(opt.value)'>
          {{ opt.label }}
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String,
  },
  data() {
    return { open: false }
  },
  computed: {
    currentOption() {
      return this.options.find(opt => opt.value === this.value) || {}
    },
    currentLabel() {
      return this.currentOption.label || ''
    },
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
      this.open = false
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'theme'
@require 'fade'

.current
  theme-input-styles()
  theme-click-animation()
  accent-border(bottom)

.option-list
  theme-input-styles()
  accent-border(bottom)
  padding: 0
  position: absolute
  z-index: 9999
  width: min-content

.option
  theme-input-styles()
  theme-click-animation()
  font-size: 100%
  display: block
</style>
