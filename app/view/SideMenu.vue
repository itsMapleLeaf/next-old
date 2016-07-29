<template>
  <div class='ui-overlay' @click.self='close'>
    <div :class='panelClass' class='ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <slot name='content'></slot>
      </section>
      <section class='flex-grow color-dark'>
        <slot name='options'></slot>
      </section>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  props: {
    left: Boolean,
    right: Boolean
  },

  data () {
    return { store }
  },

  methods: {
    close () {
      this.store.popOverlay()
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
