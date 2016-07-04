<template>
  <overlay>
    <h2>Chill and chat? Sounds good.</h2>
    <form class='ui form'>
      <section class='ui field'>
        <ul class='ui selection'>
          <li v-for='channel in slicedChannelList'
          v-if="channel.name.trim() !== ''"
          class="ui noselect {{isJoined(channel.id) ? 'active' : ''}}"
          :data-toggle-channel='channel.id'>
            <span class='ui pull right'>{{channel.userCount}}</span>
            <span v-html="channel.name"></span>
          </li>
        </ul>
      </section>

      <section class='ui field text-input icon left'>
        <i class='fa fa-search'></i>
        <input type="text" placeholder="Search..." v-model='search'>
      </section>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.selection
  text-align: left
  width: 18em
  height: 28em

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
        const filter = ch => ch.name.toLocaleLowerCase().includes(query)
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
