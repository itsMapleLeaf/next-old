<template lang='pug'>
.tooltip(:class=`{ right: right, bottom: bottom, inline: inline }`, :data-tooltip-text=`text`)
  slot
</template>

<script>
export default {
  props: {
    right: Boolean,
    bottom: Boolean,
    inline: Boolean,
    text: String
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/colors'
@require '../styles/mixins'

.tooltip
  position: relative

  &::after
    animate()
    content: attr(data-tooltip-text)
    background: darken($theme-color, 50%)
    font-size: 0.9rem
    position: absolute
    padding: 0.3em 0.6em
    width: max-content
    max-width: 10em
    text-align: center
    border-radius: 0.15em
    pointer-events: none
    opacity: 0
    z-index: 9999
    transition-delay: 0s

  &:hover::after
    opacity: 1
    transition-delay: 0.3s

.right
  &::after
    top: 50%
    transform: translateY(-50%)

  &:hover::after
    transform: translateY(-50%) translateX(0.5em)

.bottom
  &::after
    top: 100%
    left: 50%
    transform: translateX(-50%)

  &:hover::after
    transform: translateX(-50%) translateY(0.3em)

.inline
  display: inline-block
</style>
