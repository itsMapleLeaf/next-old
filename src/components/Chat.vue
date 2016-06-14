<template>
  <div class='grid'>
    <div class='row row-2'>
      <div class='col-2 fg-color center-content'>
        <i class='fa fa-bars'></i>
      </div>
      <div class='row grow'>
        <span class='col-8 padded center-content-vertical' v-for='channel in getJoinedChannels'>
          {{ channel.name }}
        </span>
      </div>
    </div>

    <div class='row row-6 fg-color padded'>
      room info
    </div>

    <div class='divider'></div>

    <div class='row grow'>
      <div class='grow padded'>
        chat message area
      </div>

      <div class='divider'></div>

      <div class='col-10 fg-color padded'>
        character list
      </div>
    </div>

    <div class='divider'></div>

    <div class='row row-6 fg-color'>
      <chatbox></chatbox>
    </div>
  </div>
</template>

<script>
import Chatbox from './Chatbox.vue'
import {getJoinedChannels} from '../vuex/getters'

export default {
  components: {
    Chatbox
  },

  vuex: {
    getters: {
      getJoinedChannels
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/grid'
@import '../styles/components'

.padded
  padding: 0.5em 0.7em
</style>
