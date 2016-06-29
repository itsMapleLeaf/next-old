<template>
  <div class='ui overlay' transition="fade" @click.self='closeOverlay'>
    <div class='ui panel'>
      <h1>Channel List</h1>
      <form class='ui form' @submit.prevent='closeOverlay'>
        <div class='ui field'>
          <ul class='ui selection'>
            <li v-for='channel in slicedChannelList'
            v-if="channel.name.trim() !== ''"
            @click='channelClicked(channel)'
            :class="{ 'active': isJoined(channel.id) } ">
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
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.selection
  width: 14em
  text-align: left

  li
    padding-left: 0.8em
    padding-right: 0.8em
</style>

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
      this.$emit('channel-list-clicked', channel)
    }
  }
}
</script>
