<template>
  <overlay>
    <h2>Let's find some friends.</h2>
    <form>
      <div class='ui-field'>
        <div class="ui-color-dark ui-border ui-scroll characters">
          <div class="ui-highlight-green" v-for='char in getGroup("friends")'>
            <i class='mdi mdi-heart' style='float: right'></i>
            <character :character='char'></character>
          </div>
          <div class="ui-highlight-blue" v-for='char in getGroup("bookmarks")'>
            <i class='mdi mdi-star' style='float: right'></i>
            <character :character='char'></character>
          </div>
          <div v-for='char in getGroup("looking").slice(0, 200)'>
            <character :character='char'></character>
          </div>
          <div v-for='char in getGroup("rest").slice(0, 200)'>
            <character :character='char'></character>
          </div>
        </div>
      </div>
      <div class="ui-field ui-input-icon">
        <i class="ui-icon mdi mdi-magnify"></i>
        <input class="ui-input" type="text" placeholder="Search..." v-model="searchText" debounce="500" />
      </div>
    </form>
  </overlay>
</template>

<style scoped>
.characters {
  text-align: left;
  width: 14em;
  height: 20em;
}

.characters > div {
  padding: 0.4em 0.6em;
}
</style>

<script>
import Character from './Character.vue'
import Dropdown from './Dropdown.vue'
import Overlay from './Overlay.vue'
import {groupSort} from '../modules/common'

export default {
  components: {Character, Dropdown, Overlay},

  data () {
    return {
      searchText: '',
      groups: {}
    }
  },

  vuex: {
    getters: {
      friends: state => state.chat.friends,
      bookmarks: state => state.chat.bookmarks,
      characterMap: state => state.chat.characters
    }
  },

  methods: {
    getGroup (which) {
      let group = this.groups[which] || []
      if (this.searchText.trim()) {
        group = group.filter(char => char.name.toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()))
      }
      return group
    }
  },

  watch: {
    characterMap (map) {
      this.groups = groupSort(Object.values(map), char => {
        switch (true) {
          case this.friends[char.name] != null:
            return 'friends'
          case this.bookmarks[char.name]:
            return 'bookmarks'
          case char.status === 'looking':
            return 'looking'
          default:
            return 'rest'
        }
      })
    }
  }
}
</script>
