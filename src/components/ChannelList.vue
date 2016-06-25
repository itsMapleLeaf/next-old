<template>
  <div class='shade box center' @click.self='closeOverlay'>
    <div class='panel'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <ul class='selection-list'>
          <li v-for='channel in slicedChannelList'
          @click='channelClicked(channel)'
          :class="{ 'selected': isJoined(channel.id) } ">
            {{channel.name}}
          </li>
        </ul>

        <input type="text" placeholder="Search..."
        v-model='searchQuery'>
        <br>

        <button @click='closeOverlay'>Done</button>
        <br>
      </form>
    </div>
  </div>
</template>

<script>
import state from '../state'
import fuzzysearch from 'fuzzysearch'
import {ChannelStatus} from '../types'

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
    },

    closeOverlay () {
      this.$dispatch('overlay-change-request', '')
    },

    channelClicked (channel) {
      console.log(this.state.getChannelStatus(channel.id))
      this.$emit('channel-list-clicked', channel)
    }
  }
}
</script>
