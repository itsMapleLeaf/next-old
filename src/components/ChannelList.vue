<template>
  <div class='shade box center' @click.self='closeOverlay'>
    <div class='panel'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <selection-list
          :items='channelListItems()'
          :init='channelListItemsInit()'
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

  methods: {
    channelListItems () {
      return this.getFilteredChannels().map(info => {
        return { label: info.title || info.name, value: info.name }
      })
    },

    channelListItemsInit () {
      return this.joinedChannels.map(ch => ch.id)
    },

    getFilteredChannels () {
      if (this.searchQuery.trim() !== '') {
        return this.allChannels.filter(this.matchesSearch).slice(0, 200)
      } else {
        return this.allChannels.slice(0, 200)
      }
    },

    matchesSearch (info) {
      const query = this.searchQuery.toLocaleLowerCase()
      const title = (info.title || info.name).toLocaleLowerCase()
      return fuzzysearch(query, title)
    },

    channelSelected (id) {
      this.joinChannel(id)
    },

    channelDeselected (id) {
      this.leaveChannel(id)
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
