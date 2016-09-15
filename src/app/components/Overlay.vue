<template>
  <div class='overlay-shade'>
    <div class='overlay'>
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

.overlay-shade
  background: rgba(black, 0.5)
  fullscreen()
  flex()
  flex-align(center)

.overlay
  width: max-content

.overlay-header
  background: darken($theme-color, 20%)
  padding: 0.5em 1em
  text-align: center
  accent-border(bottom)

.overlay-content
  background: $theme-color
</style>
