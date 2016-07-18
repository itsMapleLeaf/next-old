<template>
  <overlay>
    <h2>Let's find some friends.</h2>
    <form>
      <div class='ui-field'>
        <div class="ui-color-dark ui-border ui-scroll characters">
          <div class="ui-highlight-green" v-for='char in groups.friends || []'>
            <character class='character' :character='char'></character>
            <i class='mdi mdi-heart'></i>
          </div>
          <div class="ui-highlight-blue" v-for='char in groups.bookmarks || []'>
            <character class='character' :character='char'></character>
            <i class='mdi mdi-star'></i>
          </div>
          <div v-for='char in groups.looking || []'>
            <character class='character' :character='char'></character>
          </div>
          <div v-for='char in groups.rest || []'>
            <character class='character' :character='char'></character>
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
  position: relative;
}

.characters > div > i {
  position: absolute;
  top: 0.4em;
  right: 0.6em;
  pointer-events: none;
}

.character {
  display: block;
  padding: 0.4em 0.6em;
}
</style>

<script>
import Character from './Character.vue'
import Dropdown from './Dropdown.vue'
import Overlay from './Overlay.vue'
import {groupSort} from '../modules/common'

function compareOnlineTime (a, b) {
  return b.onlineSince - a.onlineSince
}

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
      characters: state => Object.values(state.chat.characters)
    }
  },

  watch: {
    // TODO: only generate character groups once, and add a refresh button
    characters (list) {
      const groups = groupSort(list, char => {
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

      for (let group in groups) {
        groups[group] = groups[group]
          .filter(char => char.name.toLocaleLowerCase()
            .includes(this.searchText.toLocaleLowerCase()))
          .slice(0, 200)
          .sort(compareOnlineTime)
      }

      this.groups = groups
    }
  }
}
</script>
