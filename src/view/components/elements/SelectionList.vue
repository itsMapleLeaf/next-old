<template>
  <ol class="ui-dark ui-border scroll-y">
    <slot></slot>
  </ol>
</template>

<style lang="stylus">
@import '../styles/App-ui.styl'
@import '../styles/App-common.styl'

ol {
  width: 14em
  height: 18em
}

li {
  padding: 0.5em
  cursor: pointer
}

li[active] {
  @extend .ui-highlight-green
}
</style>

<script>
export default {}
</script>
