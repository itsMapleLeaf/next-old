<template>
  <header class='flex-row'>
    <div class='flex-fixed'>
      <span>F-Chat Next</span>
      <span>v0.5.0</span>
      <!-- <a href='#' class='link'>
        <i class='mdi mdi-information'></i>
      </a> -->
    </div>
    <nav class='flex-grow'>
      <a href='#' v-for='option in options' class='tooltip-bottom'
        :data-tooltip='option.info' @click='option.action && option.action()'>
        <i :class="'mdi mdi-' + option.icon"></i>
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    options: Array
  }
}
</script>

<style lang='stylus' scoped>
@require 'elements/tooltip'
@require 'elements/flex'
@require 'mixins/theme'
@require 'mixins/flex'

header
  flex-align(center)
  nav
    text-align: right
    a
      active-animation()
      font-size: 130%
      margin-left: 0.6em
</style>
