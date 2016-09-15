<template>
  <Overlay header='Channel List'>
    <div class='selection-list'>
      <!-- <a href='#' v-for='ch of channels'>
        <span class='channel-name'>{{ ch.name }}</span>
        <span class='channel-user-count'>{{ ch.users }}</span>
      </a> -->
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
  computed: getters(['publicChannelList', 'privateChannelList'])
}
</script>

<style lang='stylus' scoped>
.selection-list
  width: 18em
  max-height: 24em

.channel-user-count
  float: right
</style>
