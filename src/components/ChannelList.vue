<template>
  <div class='overlay-shade' @click.self='closeOverlay'>
    <div class='panel material-shadow'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <selection-list>
          <selection-list-item class='row' v-for='info in filteredChannels' @click='toggleChannel(info)' :selected='getJoined(info)'>
            <span class='grow'>
              {{ info.title || info.name }}
              <i class='fa fa-check' v-if='getJoined(info)'></i>
            </span>
            <span>{{ info.characters }}</span>
          </selection-list-item>
        </selection-list><br>
        <input type="text" placeholder="Search..." v-model='searchQuery'><br>
        <button>Done</button><br>
      </form>
    </div>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import SelectionListItem from './SelectionListItem.vue'
import {allChannels, joinedChannels} from '../vuex/getters'
import {setCurrentOverlay, joinChannel, leaveChannel} from '../vuex/actions'
import fuzzysearch from 'fuzzysearch'

export default {
  components: {
    SelectionList,
    SelectionListItem
  },

  data () {
    return {
      searchQuery: ''
    }
  },

  computed: {
    filteredChannels () {
      if (this.searchQuery !== '') {
        const filter = info => fuzzysearch(this.searchQuery, info.title || info.name)
        return this.allChannels.filter(filter).slice(0, 200)
      } else {
        return this.allChannels.slice(0, 200)
      }
    }
  },

  methods: {
    matchesSearch (info) {
      return fuzzysearch(this.searchQuery, info.title || info.name)
    },

    toggleChannel (info) {
      if (!this.getJoined(info)) {
        this.joinChannel(info.name, info.title)
      } else {
        this.leaveChannel(info.name)
      }
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

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/grid'
@import '../styles/components'

.panel
  width: 20em
</style>
