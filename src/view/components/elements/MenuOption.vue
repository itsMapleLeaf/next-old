<template>
  <a class='ui-dark no-select cursor-pointer' target="_blank">
    <i class='fa fa-{{icon}} fa-fw'></i> <slot></slot>
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
