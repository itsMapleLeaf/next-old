<template lang="pug">
.ui-overlay(@click.self='close')
  .ui-width-6(:class="panelClass + ' ' + panelAlignClass")
    slot
</template>

<script>
import * as store from '../store.new'

export default {
  props: {
    left: Boolean,
    right: Boolean,
    panelClass: String
  },
  methods: {
    close () {
      store.popOverlay()
    }
  },
  computed: {
    panelAlignClass () {
      return this.left ? 'ui-panel-left'
        : this.right ? 'ui-panel-right'
        : ''
    }
  }
}
</script>
