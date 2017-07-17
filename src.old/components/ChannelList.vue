<template>
  <Overlay header='Channel List' @closed="$emit('closed')">
    <form @submit.prevent>
      <fieldset>
        <div class='form-selection-list'>
          <div v-for='ch in publicChannels' :class='channelHighlight(ch)'>
            <a href='#' @click="$emit('channel-toggled', ch)">
              <i class='mdi mdi-earth'></i>
              <span class='channel-user-count'>{{ ch.userCount }}</span>
              <span class='channel-name'>{{ ch.name }}</span>
            </a>
          </div>
          <div v-for='ch in privateChannels' :class='channelHighlight(ch)'>
            <a href='#' @click="$emit('channel-toggled', ch)">
              <div>
                <i class='mdi mdi-key-variant'></i>
                <span class='channel-user-count'>{{ ch.userCount }}</span>
                <span class='channel-name' v-html='ch.name'></span>
              </div>
              <small class='channel-id'>{{ ch.id }}</small>
            </a>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div class='form-icon-input'>
          <i class='mdi mdi-magnify'></i>
          <input type='text' placeholder='Search...' v-model='searchText'>
        </div>
      </fieldset>
    </form>
  </Overlay>
</template>

<script>
import Overlay from './Overlay.vue'
import {store, getters} from '../store'

function lower(str) {
  return str.toLocaleLowerCase()
}

export default {
  components: {
    Overlay
  },
  created() {
    store.fetchChannelList()
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    ...getters(['publicChannelList', 'privateChannelList']),
    publicChannels() {
      return this.publicChannelList
        .filter(this.channelFilter)
        .sort(this.channelOrder)
    },
    privateChannels() {
      return this.privateChannelList
        .filter(this.channelFilter)
        .sort(this.channelOrder)
        .slice(0, 200)
    },
  },
  methods: {
    channelFilter(ch) {
      return lower(ch.name).includes(lower(this.searchText))
    },
    channelOrder(a, b) {
      return b.userCount - a.userCount
    },
    channelHighlight(ch) {
      return store.isChannelJoined(ch.id) && 'channel-joined'
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'vars'

form
  text-align: center

.form-selection-list
  text-align: left
  width: 22em
  height: calc(100vh - 14em)

.channel-user-count
  float: right

.channel-id
  margin-left: 1.3rem
  color: lighten($theme-color, 25%)

.channel-joined
  highlight($green)
</style>
