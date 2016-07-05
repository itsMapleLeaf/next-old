<template>
  <div class="ui overlay" :transition="transition" @click.self="close">
    <div class="ui side-panel {{side}} flex col">
      <div class="flex fixed">
        <slot name="content"></slot>
      </div>
      <div class="flex stretch ui theme-color dark">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from 'modules/store'

export default {
  props: {
    side: {
      type: String,
      default: 'left'
    }
  },

  data () {
    return {
      transition: 'slide-' + this.side,
      store
    }
  },

  methods: {
    close () {
      this.store.dispatchEvent('PopOverlay')
    }
  }
}
</script>
