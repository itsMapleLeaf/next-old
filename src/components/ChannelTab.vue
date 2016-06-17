<template>
  <a
    class='row-2 col col-8 center-content-vertical tab'
    :class='selectedClass'>
    {{ channel.name }}
  </a>
</template>

<script>
export default {
  props: {
    channel: Object,
    selected: Boolean
  },

  computed: {
    selectedClass () {
      return {
        'selected': this.selected
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/mixins'
@require '../styles/components'
@require '../styles/variables'

.tab
  padding: 0.35em 0.8em
  display: inline-block !important

  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

  user-select: none

  +transition(hover)
    background: rgba(0, 0, 0, 0.15)
    cursor: pointer

  border-highlight(transparent)

  &.selected
    background: lighten(fg-color, 5%)
    border-highlight()
</style>
