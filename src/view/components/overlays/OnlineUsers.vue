<template>
  <overlay>
    <h2>Let's find some friends!</h2>
    <form class="ui form" @submit.prevent>
      <div class="ui field">
        <dropdown style="width: 8em" v-ref:filter>
          <li value="all">All</li>
          <li value="friend">Friends</li>
          <li value="bookmark">Bookmarks</li>
          <li value="looking">Looking</li>
        </dropdown>
      </div>
      <div class="ui field">
        <ul class="ui selection" style="">
          <li v-for="char in slicedCharacters" :class="getListClass(char)" :data-activate-character='char.name'>
            <i class="fa fa-heart ui pull-right" v-if="characterIs(char, 'friend')"></i>
            <i class="fa fa-star ui pull-right" v-if="characterIs(char, 'bookmark')"></i>
            <i class="fa fa-paw ui pull-right" v-if="characterIs(char, 'looking')"></i>
            <character :character='char'></character>
          </li>
          <center class="ui small subtle" style="padding: 0.5em" v-if="slicedCharacters.length === 200">
            <em>List truncated for performance. Search for more results.</em>
          </center>
        </ul>
      </div>
      <div class="ui field text-input icon right">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Search..." v-model="search" debounce="500" />
      </div>
      <div class="ui field">
        <button class="ui button" @click='close'>Done</button>
      </div>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.selection
  text-align: left
  width: calc(100vh - 38em)
  height: calc(100vh - 30em)
  min-width: 14em
  min-height: 18em
</style>

<script>
import Character from '../elements/Character.vue'
import Dropdown from '../elements/Dropdown.vue'
import Overlay from '../elements/Overlay.vue'

import state from '../../lib/state'
import {compareNames} from '../../lib/util'
import Fuse from 'fuse.js'

export default {
  components: {
    Character,
    Dropdown,
    Overlay
  },

  data () {
    return {
      characters: [],
      search: '',
      state
    }
  },

  ready () {
    const characters = this.state.getOnlineCharacters()
    const friends = []
    const bookmarks = []
    const looking = []
    const rest = []

    for (let char of characters) {
      const cat = this.state.getCharacterCategory(char)
      if (cat[0] === 'friend') {
        friends.push(char)
      } else if (cat[0] === 'bookmark') {
        bookmarks.push(char)
      } else if (cat[0] === 'looking') {
        looking.push(char)
      } else {
        rest.push(char)
      }
    }

    friends.sort(compareNames)
    bookmarks.sort(compareNames)
    looking.sort(compareNames)
    rest.sort(compareNames)

    this.characters = friends.concat(bookmarks, looking, rest)
  },

  computed: {
    filteredCharacters () {
      if (!this.$refs.filter) {
        return this.characters
      }

      const {value} = this.$refs.filter
      if (value === 'all') {
        return this.characters
      }

      return this.characters.filter(char => {
        const cat = this.state.getCharacterCategory(char)
        return cat.includes(value)
      })
    },

    searchedCharacters () {
      const filtered = this.filteredCharacters
      if (this.search.trim() !== '') {
        const fuse = new Fuse(filtered, { keys: ['name', 'gender'] })
        return fuse.search(this.search)
      }
      return filtered
    },

    slicedCharacters () {
      return this.searchedCharacters.slice(0, 200)
    }
  },

  methods: {
    characterIs (char, what) {
      const cat = this.state.getCharacterCategory(char)
      return cat.includes(what)
    },

    getListClass (char) {
      const cat = this.state.getCharacterCategory(char)
      if (cat[0] === 'friend') {
        return 'ui highlight green'
      } else if (cat[0] === 'bookmark') {
        return 'ui highlight blue'
      }
      return ''
    }
  }
}
</script>
