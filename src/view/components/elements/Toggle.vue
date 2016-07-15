<template>
  <a href='#' class="ui-link"
    :style="{ opacity: value ? 1 : 0.5 }"
    @click.prevent @keydown.space="$emit('click')">
    <i class="fa fa-fw" :class="{ 'fa-square': value, 'fa-square-o': !value }"></i>
    <slot></slot>
  </a>
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
