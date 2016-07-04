<template>
  <span class="ui hover-darken small noselect" :class="{ 'subtle': !value }">
    <i class="fa fa-fw" :class="{ 'fa-square': value, 'fa-square-o': !value }"></i>
    <slot></slot>
  </span>
</template>

<style lang="stylus" scoped>
span
  display: inline-block
  padding: 0.3em 0.5em
</style>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
