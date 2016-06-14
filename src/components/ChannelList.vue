<template>
  <div class='overlay-shade'>
    <div class='panel material-shadow'>
      <h1>Channel List</h1>
      <form>
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
import {getAllChannels} from '../vuex/getters'
import fuzzysearch from 'fuzzysearch'

export default {
  components: {
    SelectionList,
    SelectionListItem
  },

  data () {
    return {
      searchQuery: '',
      joinedChannels: {}
    }
  },

  computed: {
    filteredChannels () {
      if (this.searchQuery !== '') {
        const filter = info => fuzzysearch(this.searchQuery, info.title || info.name)
        return this.getAllChannels.filter(filter).slice(0, 200)
      } else {
        return this.getAllChannels.slice(0, 200)
      }
    }
  },

  methods: {
    matchesSearch (info) {
      return fuzzysearch(this.searchQuery, info.title || info.name)
    },

    toggleChannel (info) {
      this.$set(`joinedChannels["${info.name}"]`, !this.joinedChannels[info.name])
    },

    isJoined (info) {
      return this.joinedChannels[info.name]
    }
  },

  vuex: {
    getters: {
      getAllChannels
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
