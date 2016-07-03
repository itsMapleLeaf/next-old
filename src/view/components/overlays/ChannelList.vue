<template>
  <overlay panel-width='20em' panel-height='32em'>
    <h2>Chill and chat? Sounds good.</h2>
    <form class='ui form'>
      <div class='ui field'>
        <ul class='ui selection'>
          <li v-for='channel in slicedChannelList'
          v-if="channel.name.trim() !== ''"
          class="ui noselect {{isJoined(channel.id) ? 'active' : ''}}"
          :data-toggle-channel='channel.id'>
            <span class='ui pull right'>{{channel.userCount}}</span>
            <span v-html="channel.name"></span>
          </li>
        </ul>
      </div>

      <div class='ui field text-input icon left'>
        <i class='fa fa-search'></i>
        <input type="text" placeholder="Search..."
        v-model='searchQuery'>
      </div>

      <div class='ui field'>
        <button class='ui button'>Done</button>
      </div>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.selection
  text-align: left
  width: 16em
  height: 20em

  li
    padding-left: 0.8em
    padding-right: 0.8em

    span
      pointer-events: none
</style>

<script>
import Overlay from '../elements/Overlay.vue'

import state from '../../lib/state'
import {ChannelStatus} from '../../lib/types'
import fuzzysearch from 'fuzzysearch'

function compareChannelInfo (a, b) {
  return a.name.localeCompare(b.name)
}

export default {
  data () {
    return {
      searchQuery: '',
      state
    }
  },

  components: {
    Overlay
  },

  computed: {
    channelList () {
      const publicChannels = this.state.getPublicChannelList().sort(compareChannelInfo)
      const privateChannels = this.state.getPrivateChannelList().sort(compareChannelInfo)
      return publicChannels.concat(privateChannels)
    },

    filteredChannelList () {
      if (this.searchQuery.trim() === '') {
        return this.channelList
      } else {
        const query = this.searchQuery.toLocaleLowerCase()
        const filter = ch => fuzzysearch(query, ch.name.toLocaleLowerCase())
        return this.channelList.filter(filter)
      }
    },

    slicedChannelList () {
      return this.filteredChannelList.slice(0, 200)
    }
  },

  methods: {
    isJoined (id) {
      return this.state.getChannelStatus(id) === ChannelStatus.joined
    }
  }
}
</script>
