<template>
  <div class='ui-overlay'>
    <div class='ui-overlay-shade' @click="popOverlay"></div>
    <div class='flex-column' :class='"ui-overlay-panel-" + side'>
      <div class='flex-fixed'>
        <slot name="content"></slot>
      </div>
      <nav class='flex-stretch ui-color-dark'>
        <slot name="options"></slot>
      </nav>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
section {
  padding: 0em 1em;
}
</style>

<script>
import {popOverlay} from '../modules/vuex/actions'

export default {
  props: {
    side: {
      type: String,
      default: 'left'
    }
  },

  vuex: {
    actions: {
      popOverlay
    }
  }
}
</script>
