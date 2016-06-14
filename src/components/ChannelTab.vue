<template>
  <div class='tab row-2 col-10 center-content-vertical' :class='classes'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
  },

  computed: {
    classes () {
      return {
        'selected': this.selected
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/mixins'
@import '../styles/components'
@import '../styles/variables'

.tab
  padding-left: 0.8em

  +transition(hover)
    background: rgba(0, 0, 0, 0.15)
    cursor: pointer

  &.selected
    background: fg-color
    border-highlight()
</style>
