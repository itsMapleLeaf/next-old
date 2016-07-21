<template>
  <overlay>
    <h3>Chill and chat? Sounds good.</h3>
    <form>
      <div class='ui-field'>
        <div class='ui-select'>
          <!-- TODO: make these click on focus, to make switching through them possible w/ tab -->
          <a href='#' v-for='channel in publicChannels' :data-toggle-channel='channel.id'
            :class="{ 'ui-highlight-green': activeChannels.includes(channel.id) }">
            <span style='float: right'>{{channel.users}}</span>
            <span v-html='channel.name'></span>
          </a>
          <a href='#' v-for='channel in privateChannels' :data-toggle-channel='channel.id'
            :class="{ 'ui-highlight-green': activeChannels.includes(channel.id) }">
            <span style='float: right'>{{channel.users}}</span>
            <span v-html='channel.name'></span><br />
            <small style='opacity: 0.5; font-style: italic'>{{channel.id}}</small>
          </a>
        </div>
      </div>
      <div class='ui-field ui-input-icon'>
        <i class='ui-icon mdi mdi-magnify'></i>
        <input type='text' placeholder='Search...' v-model='searchText'>
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

  ready () {
    socket.requestChannels()
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
      publicChannelMap: state => state.chat.channels.public,
      privateChannelMap: state => state.chat.channels.private,
      activeChannels: state => state.chat.activeChannels
    },
    actions: {pushOverlay, popOverlay}
  }
}
</script>
