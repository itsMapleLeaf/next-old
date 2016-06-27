<template>
  <a class='tab' :class="{ 'selected': selected }">
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
@import '../styles/layout'
@import '../styles/theme-colors'

.tab
  @extend .border-highlight
  width: 8em
  height: 100%
  border-bottom-color: transparent
  padding: 0.6em 1em

  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  cursor: pointer
  transition: 0.3s all

.tab:hover:not(.selected)
  @extend .bg-theme-darkest

.tab.selected
  @extend .bg-theme
  @extend .border-highlight-bright

/*@import '../styles/variables'
@import '../styles/mixins'

a
  width: 8em
  height: 2em
  padding: 0em 0.8em
  cursor: pointer
  border-highlight(color: transparent)

span
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

.selected
  background-color: fg-color
  border-highlight(10%)*/
</style>
