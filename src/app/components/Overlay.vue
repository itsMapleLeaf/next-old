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
@require '../stylus/mixins'
@require '../stylus/colors'

.overlay-shade
  background: rgba(black, 0.5)
  fullscreen()

.overlay-header
  background: darken($theme-color, 20%)
  accent-border(bottom)

.overlay-content
  background: $theme-color
</style>
