<template>
  <div class='shade box center' @click.self='closeOverlay'>
    <div class='panel'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <ul class='selection-list'>
          <li v-for='channel in filteredChannelList'
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
import SelectionList from './SelectionList.vue'
import {publicChannels, privateChannels, userChannels} from '../vuex/getters'
import fuzzysearch from 'fuzzysearch'

export default {
  components: {
    SelectionList
  },

  data () {
    return {
      searchQuery: ''
    }
  },

  computed: {
    channelList () {
      return this.publicChannels.sort(this.compareChannelInfo)
    },

    filteredChannelList () {
      if (this.searchQuery.trim() === '') {
        return this.channelList
      } else {
        const query = this.searchQuery.toLocaleLowerCase()
        const filter = ch => fuzzysearch(query, ch.name.toLocaleLowerCase())
        return this.channelList.filter(filter)
      }
    }
  },

  methods: {
    isJoined (id) {
      const channel = this.userChannels[id]
      return channel && channel.status === 'joined'
    },

    closeOverlay () {
      this.$dispatch('overlay-change-request', '')
    },

    channelClicked (channel) {
      this.$emit('channel-list-clicked', channel)
    },

    compareChannelInfo (a, b) {
      return a.name.localeCompare(b.name)
    }
  },

  vuex: {
    actions: {
      joinChannel (store) {},
      leaveChannel (store) {}
    },

    getters: {
      publicChannels,
      privateChannels,
      userChannels
    }
  }
}
</script>
