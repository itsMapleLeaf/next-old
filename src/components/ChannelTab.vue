<template>
  <a class='tab row-2 col-8 center-content-vertical'
    :class='selectedClass'
    @click='selectChannel(channel.name)'>

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
  padding-left: 0.8em

  +transition(hover)
    background: rgba(0, 0, 0, 0.15)
    cursor: pointer

  &.selected
    background: lighten(fg-color, 5%)
    border-highlight()

  border-bottom: 2px solid transparent
</style>
