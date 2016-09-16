<template>
  <div class='overlay-shade' @click.self="$emit('closed')">
    <div class='overlay'>
      <a href='#' class='overlay-close' @click="$emit('closed')">
        <i class='mdi mdi-close'></i>
      </a>
      <div class='overlay-header'>
        <h2>{{ header }}</h2>
      </div>
      <div class='overlay-content'>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

.overlay
  background: $theme-color
  width: max-content
  box-shadow: 0px 2px 6px rgba(black, 0.5)
  position: relative

.overlay-shade
  background: rgba(black, 0.5)
  fullscreen()
  flex-align(center)

.overlay-header
  background: darken($theme-color, 20%)
  padding: 0.5em 1em
  text-align: center
  accent-border(bottom)

.overlay-close
  padding: 0.3em 0.5em
  opacity: 0.3
  anchor(top right)
  animate()

  &:hover
    opacity: 0.7
</style>
