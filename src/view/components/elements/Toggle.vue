<template>
  <span class="ui theme-color dark hover-darken small noselect" :class="{ 'subtle': !enabled }">
    <i class="fa fa-fw" :class="{ 'fa-square': enabled, 'fa-square-o': !enabled }"></i>
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
    enabled: Boolean
  }
}
</script>
