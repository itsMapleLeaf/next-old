<template lang="jade">
.ui-overlay(@click.self='close')
  .ui-width-6.flex-column.ui-scroll-y(:class='panelClass')
    section.flex-fixed.ui-padding-5
      slot(name='content')
    section.flex-grow.color-dark
      slot(name='options')
</template>

<script>
import * as store from '../store'

export default {
  props: {
    left: Boolean,
    right: Boolean
  },

  methods: {
    close () {
      store.popOverlay()
    }
  },

  computed: {
    panelClass () {
      return this.left ? 'ui-panel-left'
        : this.right ? 'ui-panel-right'
        : ''
    }
  }
}
</script>
