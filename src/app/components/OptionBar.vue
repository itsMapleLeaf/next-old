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

$size = 1.3rem
$spacing = 0.7rem

.option
  animate-press()
  font-size: $size
  padding: $spacing $spacing 0
</style>
