<template>
  <div class='ui-shade' transition='fade' @click.self='close'></div>
  <div class='fullscreen flex-center-children no-click' transition='fade-fluid'>
    <section class='panel ui-main ui-shadow center-self' :style="{ width: panelWidth, height: panelHeight }">
      <slot></slot>
      <a class='close-button flex-center-children' href='#' v-if="!noClose" @click='close'>
        <i class='fa fa-times'></i>
      </a>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.panel
  position: relative
  text-align: center
  padding: 0em 1.2em

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
import {popOverlay} from '../../vuex/actions'

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
      if (!this.noClose) this.popOverlay()
    }
  },

  vuex: {
    actions: {popOverlay}
  }
}
</script>
