<template>
  <a class='box box-center-vertical' :class="{ 'selected': selected }">
    <span><slot></slot></span>
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

a
  width: 6em
  padding: 0em 0.5em
  cursor: pointer

  &:hover
    background-color: lighten(fg-color, 10%)

span
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

.selected
  background-color: fg-color
</style>
