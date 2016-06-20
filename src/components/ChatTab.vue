<template>
  <a class='box center-vertical hover-lighten' :class="{ 'selected': selected }">
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
@import '../styles/mixins'

a
  width: 6em
  padding: 0em 0.5em
  cursor: pointer
  border-highlight(color: transparent)

span
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

.selected
  background-color: fg-color
  border-highlight(10%)
</style>
