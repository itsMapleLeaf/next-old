<template>
  <a href='#' class="ui-small ui-link cursor-pointer"
    :class="{ 'ui-subtle': !value }"
    @click.prevent
    @keydown.space="$emit('click')">
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
