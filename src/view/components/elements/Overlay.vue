<template>
  <div class='ui overlay' transition='fade' @click.self='shadeClicked'>
    <div class='ui panel' :style="{ width: panelWidth, height: panelHeight }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {PopOverlay} from '../../lib/events'

export default {
  props: {
    closeOnShadeClicked: {
      type: Boolean,
      default: true
    },

    panelWidth: {
      type: String,
      default: 'min-content'
    },

    panelHeight: {
      type: String,
      default: 'auto'
    }
  },

  methods: {
    shadeClicked () {
      if (this.closeOnShadeClicked) {
        this.close()
      }
    },

    close () {
      this.$dispatch(PopOverlay)
    }
  }
}
</script>
