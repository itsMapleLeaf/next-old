<template>
  <a href='#' class='ui-color-dark ui-no-select'>
    <i :class="'ui-icon mdi mdi-' + icon"></i> <slot></slot>
  </a>
</template>

<style lang="stylus" scoped>
a
  display: block
  padding: 0.6em 0.6em
</style>

<script>
export default {
  props: {
    icon: String
  }
}
</script>
