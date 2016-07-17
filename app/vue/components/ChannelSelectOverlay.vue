<template>
  <overlay>
    <h2>Chill and chat? Sounds good.</h2>
    <form>
      <div class='ui-field'>
        <div class='ui-select'>
          <a href='#' v-for='channel in publicChannels' :data-toggle-channel='channel.id' :class="{ 'ui-highlight-green': activeChannels[channel.id] }">
            <span style='float: right'>{{channel.users}}</span>
            <span v-html='channel.name'></span>
          </a>
          <a href='#' v-for='channel in privateChannels' :data-toggle-channel='channel.id' :class="{ 'ui-highlight-green': activeChannels[channel.id] }">
            <span style='float: right'>{{channel.users}}</span>
            <span v-html='channel.name'></span><br />
            <small style='opacity: 0.5; font-style: italic'>{{channel.id}}</small>
          </a>
        </div>
      </div>
      <div class='ui-field ui-input-icon'>
        <i class='ui-icon mdi mdi-magnify'></i>
        <input class='ui-input' type='text' placeholder='Search...' v-model='searchText'>
      </div>
      <div class='ui-field'>
        <toggle :value='showAll' @click='showAll = !showAll'>Show all channels (lag warning)</toggle>
      </div>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.ui-select
  text-align: left
  width: 17em
  height: 24em

  a
    padding-left: 0.8em
    padding-right: 0.8em

    span
      pointer-events: none
</style>

<script>
import Overlay from './Overlay.vue'
import Toggle from './Toggle.vue'
import socket from '../modules/socket'
import {pushOverlay, popOverlay} from '../modules/vuex/actions'

function compareNames (a, b) {
  return a.name.localeCompare(b.name)
}

export default {
  components: {Overlay, Toggle},

  data () {
    return {
      searchText: '',
      showAll: false
    }
  },

  created () {
    this.pushOverlay('loading-overlay')
    socket.requestChannels().then(this.popOverlay)
  },

  computed: {
    publicChannels () {
      return this.filterChannels(this.publicChannelMap)
    },
    privateChannels () {
      return this.filterChannels(this.privateChannelMap)
    }
  },

  methods: {
    filterChannels (map) {
      let list = Object.values(map).sort(compareNames)
      if (this.searchText.trim()) {
        list = list.filter(ch => ch.name.toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()))
      }
      if (!this.showAll) {
        list = list.slice(0, 300)
      }
      return list
    }
  },

  vuex: {
    getters: {
      publicChannelMap: state => state.chat.publicChannels,
      privateChannelMap: state => state.chat.privateChannels,
      activeChannels: state => state.chat.activeChannels
    },
    actions: {pushOverlay, popOverlay}
  }
}
</script>
