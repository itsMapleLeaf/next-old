<template>
  <div class='grid'>
    <div class='row'>
      <div class='row-2 col-2 fg-color center-content'>
        <i class='fa fa-bars'></i>
      </div>
      <div class='row grow' style='flex-wrap: wrap'>
        <channel-tab v-for='channel in joinedChannels' :channel='channel'>
        </channel-tab>
      </div>
    </div>

    <div v-if='selectedChannel' class='row row-6 fg-color padded overflow preserve-space'>
      {{ selectedChannel.description }}
    </div>

    <div class='divider'></div>

    <div class='row grow'>
      <div class='grow padded'>
        chat message area
      </div>

      <div class='divider'></div>

      <div class='col-10 fg-color padded overflow'>
        <div v-for='char in selectedChannel.characters'>
          {{ char.name }}
        </div>
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
import ChannelTab from './ChannelTab.vue'
import {joinedChannels, selectedChannel} from '../vuex/getters'

export default {
  components: {
    Chatbox,
    ChannelTab
  },

  vuex: {
    getters: {
      joinedChannels,
      selectedChannel
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
