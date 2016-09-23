<template>
  <header class='flex-row'>
    <div class='flex-fixed'>
      <span>F-Chat Next</span>
      <span>v{{ version }}</span>
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
import {version} from '../../../package.json'

export default {
  props: {
    options: Array,
  },
  data() {
    return { version }
  },
}
</script>

<style lang='stylus' scoped>
@require 'tooltip'
@require 'flex'
@require 'theme'

header
  flex-align(center)
  nav
    text-align: right
    a
      theme-click-animation()
      font-size: 130%
      margin-left: 0.6em
</style>
