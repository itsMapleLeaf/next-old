<template>
  <a class='selection-list-item' :class='{ "selected": selected }'>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    selected: Boolean
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables'

.selection-list-item
  display: block
  padding: 0.5em
  transition: 0.2s ease all
  text-align: left

  &.selected
    background: rgba(46, 204, 113, 0.2)
    color: rgb(46, 204, 113)

  &:hover
    cursor: pointer
    background: rgba(white, 0.1)
</style>
