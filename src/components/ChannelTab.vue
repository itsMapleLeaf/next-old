<template>
  <a class='tab row-2 col col-8 center-content-vertical'
    :class='selectedClass'
    @click='selectChannel(channel.name)'
    :title='channel.name'>

    {{ channel.name }}
  </a>
</template>

<script>
import {selectedChannel} from '../vuex/getters'
import {selectChannel} from '../vuex/actions'

export default {
  props: {
    channel: Object
  },
  computed: {
    selectedClass () {
      return {
        'selected': this.selectedChannel.name === this.channel.name
      }
    }
  },
  vuex: {
    getters: {
      selectedChannel
    },
    actions: {
      selectChannel
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
  padding: 0.3em 0.8em
  display: inline-block

  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

  +transition(hover)
    background: rgba(0, 0, 0, 0.15)
    cursor: pointer

  &.selected
    background: lighten(fg-color, 5%)
    border-highlight()

  border-bottom: 2px solid transparent
</style>
