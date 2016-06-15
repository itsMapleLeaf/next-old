<template>
  <a>
    <i class='fa fa-{{icon}}'></i> <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/variables'

a
  display: block
  padding: 0.7em 1em
  background: bg-color
  user-select: none

  +transition(hover)
    background: darken(bg-color, 20%)
    cursor: pointer

i
  width: 1.1em
</style>
