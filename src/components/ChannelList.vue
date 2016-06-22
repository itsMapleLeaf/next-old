<template>
  <div class='shade box center' @click.self='closeOverlay'>
    <div class='panel'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <ul class='selection-list'>
          <li v-for='channel in channelList'
          @click='channelClicked(channel)'
          :class="{ 'selected': isJoined(channel.id) } ">
            {{channel.name}}
          </li>
        </ul>

        <input type="text" placeholder="Search..."
        v-model='searchQuery'>
        <br>

        <button>Done</button>
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
      return this.publicChannels.sort()
    }
  },

  methods: {
    isJoined (id) {
      const channel = this.userChannels[id]
      return channel && channel.status === 'joined'
    },

    closeOverlay () {
      this.$emit('overlay-closed')
    },

    channelClicked (channel) {
      this.$emit('channel-list-clicked', channel)
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
