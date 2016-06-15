<template>
  <div class='selection-list'>
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../styles/variables'
@import '../styles/mixins'

.selection-list
  border-highlight()
  width: 14em
  height: 20em
  display: inline-block
  overflow-y: auto
  background: bg-color
  user-select: none
  margin-bottom: 1em
</style>
