<template>
  <div class='overlay-shade' @click.self='closeOverlay'>
    <div class='panel material-shadow'>
      <h1>Channel List</h1>
      <form @submit.prevent='closeOverlay'>
        <fieldset>
          <selection-list>
            <selection-list-item class='row' v-for='info in filteredChannels' @click='toggleChannel(info)' :selected='isJoined(info)'>
              <span class='grow'>
                {{ info.title || info.name }}
                <i class='fa fa-check' v-if='isJoined(info)'></i>
              </span>
              <span>{{ info.characters }}</span>
            </selection-list-item>
          </selection-list>
        </fieldset>
        <fieldset>
          <input type="text" placeholder="Search..." v-model='searchQuery'>
        </fieldset>
        <fieldset>
          <button>Done</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import SelectionListItem from './SelectionListItem.vue'
import {allChannels, joinedChannels} from '../vuex/getters'
import {setCurrentOverlay, joinChannel} from '../vuex/actions'
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
      if (!this.isJoined(info)) {
        this.joinChannel(info.name, info.title)
      }
    },

    isJoined (info) {
      return this.joinedChannels[info.name]
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
      joinChannel
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
