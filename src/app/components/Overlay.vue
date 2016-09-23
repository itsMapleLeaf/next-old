<template>
  <div class='overlay-shade' @click.self="$emit('closed')">
    <div class='overlay-panel overlay-ease-down'>
      <a href='#' class='overlay-close' @click="$emit('closed')">
        <i class='mdi mdi-close'></i>
      </a>
      <div class='header' v-if='header'>
        <h2>{{ header }}</h2>
      </div>
      <div class='content'>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String,
  },
}
</script>

<style lang='stylus' scoped>
@require 'overlay'
@require 'theme'
@require 'animate'

.header
  background: darken($theme-color, 10%)
  padding: 0.5em 1em
  text-align: center
  accent-border(bottom)

.overlay-close
  padding: 0.3em 0.5em
  opacity: 0.3
  anchor(top right)

  +animate(hover)
    opacity: 0.7
</style>
