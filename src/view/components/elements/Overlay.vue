<template>
  <section class='ui overlay' transition='fade' @click.self='close'>
    <section class='ui panel' :style="{ width: panelWidth, height: panelHeight }">
      <slot></slot>
      <button v-if="!noClose" class='ui subtle hover-darken close-button' @click='close'>
        <i class='fa fa-times'></i>
      </button>
    </section>
  </section>
</template>

<style lang="stylus" scoped>
.panel
  position: relative

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
import {PopOverlay} from '../../lib/events'

export default {
  props: {
    noClose: {
      type: Boolean,
      default: false
    },

    panelWidth: {
      type: String,
      default: 'min-content'
    },

    panelHeight: {
      type: String,
      default: 'max-content'
    }
  },

  methods: {
    close () {
      if (!this.noClose) {
        this.$dispatch(PopOverlay)
      }
    }
  }
}
</script>
