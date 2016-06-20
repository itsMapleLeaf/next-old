<template>
  <div class='shade box center' @click.self='closeOverlay'>
    <div class='panel'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <selection-list
          :items='channelListItems'
          :multiple='true'
          @selected='channelSelected'
          @deselected='channelDeselected'>
        </selection-list><br>
        <input type="text" placeholder="Search..." v-model='searchQuery'><br>
        <button>Done</button><br>
      </form>
    </div>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import {allChannels, joinedChannels} from '../vuex/getters'
import {setCurrentOverlay, joinChannel, leaveChannel} from '../vuex/actions'
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
    filteredChannels () {
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLocaleLowerCase()
        const filter = info => {
          return fuzzysearch(query, (info.title || info.name).toLocaleLowerCase())
        }
        return this.allChannels.filter(filter).slice(0, 200)
      } else {
        return this.allChannels.slice(0, 200)
      }
    },

    channelListItems () {
      return this.filteredChannels.map(info => {
        return { label: info.title || info.name, value: info }
      })
    }
  },

  methods: {
    matchesSearch (info) {
      return fuzzysearch(this.searchQuery, info.title || info.name)
    },

    channelSelected (info) {
      this.joinChannel(info.name, info.title)
    },

    channelDeselected (info) {
      this.leaveChannel(info.name)
    },

    getJoined (info) {
      return this.joinedChannels.find(ch => ch.name === info.name) !== undefined
    },

    closeOverlay () {
      this.setCurrentOverlay('')
    }
  },

  vuex: {
    getters: {
      allChannels,
      joinedChannels
    },
    actions: {
      setCurrentOverlay,
      joinChannel,
      leaveChannel
    }
  }
}
</script>
