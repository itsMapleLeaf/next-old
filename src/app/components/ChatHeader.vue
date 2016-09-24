<template>
  <header class='container flex-row'>
    <nav class='option-row flex-fixed'>
      <a href='#' v-for='option in options' class='option tooltip-bottom'
        :data-tooltip='option.info' @click='option.action && option.action()'>
        <i :class="'mdi mdi-' + option.icon"></i>
      </a>
    </nav>
    <div class='flex-fixed'>
      <span>F-Chat Next</span>
      <span>v{{ version }}</span>
      <!-- <a href='#' class='link'>
        <i class='mdi mdi-information'></i>
      </a> -->
    </div>
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

.container
  flex-align(space-between, center)
</style>
