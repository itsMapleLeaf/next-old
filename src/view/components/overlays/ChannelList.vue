<template>
  <div class='ui overlay' transition="fade" @click.self='closeOverlay'>
    <div class='ui panel'>
      <h2>Chill and chat? Sounds good.</h2>
      <form class='ui form' @submit.prevent='closeOverlay'>
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
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.selection
  min-width: 14em
  min-height: 20em
  text-align: left

  width: calc(100vh - 35em)
  height: calc(100vh - 25em)

  li
    padding-left: 0.8em
    padding-right: 0.8em

    span
      pointer-events: none
</style>

<script>
import state from '../../lib/state'
import fuzzysearch from 'fuzzysearch'
import {ChannelStatus} from '../../lib/types'
import {PushOverlay, PopOverlay, ToggleChannelRequest} from '../../lib/events'

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
      this.$dispatch(PopOverlay)
    }
  }
}
</script>
