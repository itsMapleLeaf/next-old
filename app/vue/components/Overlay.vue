<template>
  <div class='ui-overlay'>
    <div class='ui-overlay-shade' @click.self='close'></div>
    <div class='ui-overlay-panel'>
      <slot></slot>
      <a class='flex-center-children close-button' href='#' v-if="!noClose" @click='close'>
        <i class='mdi mdi-times'></i>
      </a>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ui-overlay-panel
  position: relative
  text-align: center
  padding: 1em 1.2em

.close-button
  max-width: 100vw
  max-height: 100vh
  width: 2em
  height: @width
  background: none
  position: absolute
  top: 0
  right: 0
</style>

<script>
import {popOverlay} from '../modules/vuex/actions'

export default {
  props: {
    noClose: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close () {
      if (!this.noClose) this.popOverlay()
    }
  },

  vuex: {
    actions: {popOverlay}
  }
}
</script>
