<template>
  <Overlay header='Channel List'>
    <div class='selection-list'>
      <a href='#' v-for='ch of publicChannels'>
        <i class='mdi mdi-earth'></i>
        <span class='channel-name'>{{ ch.name }}</span>
        <span class='channel-user-count'>{{ ch.userCount }}</span>
      </a>
      <a href='#' v-for='ch of privateChannels'>
        <i class='mdi mdi-key-variant'></i>
        <span class='channel-name' v-html='ch.name'></span>
        <span class='channel-user-count'>{{ ch.userCount }}</span>
      </a>
    </div>
  </Overlay>
</template>

<script>
import Overlay from './Overlay.vue'
import {store, getters} from '../store'

export default {
  components: {
    Overlay
  },
  created () {
    store.fetchChannelList()
  },
  computed: {
    ...getters(['publicChannelList', 'privateChannelList']),

    publicChannels () {
      return this.publicChannelList
        .slice()
        .sort((a, b) => b.userCount - a.userCount)
    },

    privateChannels () {
      return this.privateChannelList
        .slice()
        .sort((a, b) => b.userCount - a.userCount)
        .slice(0, 200)
    }
  }
}
</script>

<style lang='stylus' scoped>
.selection-list
  width: 18em
  max-height: 24em

.channel-user-count
  float: right
</style>
