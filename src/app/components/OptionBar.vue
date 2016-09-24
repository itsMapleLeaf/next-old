<template>
  <nav class='container'>
    <a href='#' v-for='option in options' class='option tooltip-right'
      :data-tooltip='option.info' @click='option.action && option.action()'>
      <i :class="'mdi mdi-' + option.icon"></i>
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    options: Array,
  },
}
</script>

<style lang='stylus' scoped>
@require 'animate'
@require 'tooltip'

.option
  animate-press()
  font-size: 150%
  padding: 0.5rem 0.5rem 0
</style>
