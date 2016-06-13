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

.selection-list
  height: 20em
  overflow-y: scroll
  background: bg-color
</style>
