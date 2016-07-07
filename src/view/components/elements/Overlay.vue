<template>
  <section class='fullscreen ui-shade flex-center-children' transition='fade' @click.self='close'>
    <section class='panel ui-main ui-shadow' :style="{ width: panelWidth, height: panelHeight }">
      <slot></slot>
      <button v-if="!noClose" @click='close'>
        <i class='fa fa-times'></i>
      </button>
    </section>
  </section>
</template>

<style lang="stylus" scoped>
.panel
  position: relative
  text-align: center

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
import {store} from 'modules/store'

export default {
  data () {
    return { store }
  },

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
        this.store.notify('PopOverlay')
      }
    }
  }
}
</script>
