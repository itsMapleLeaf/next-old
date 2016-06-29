<template>
  <a class='ui hover-darken'>
    <i class='fa fa-{{icon}} fa-fw'></i> <slot></slot>
  </a>
</template>

<style lang="stylus" scoped>
a
  display: block
  padding: 0.8em 1em
</style>

<script>
export default {
  props: {
    icon: String
  }
}
</script>
