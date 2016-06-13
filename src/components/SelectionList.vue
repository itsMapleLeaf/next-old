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
  height: 20em
  overflow-y: auto
  background: bg-color
</style>
