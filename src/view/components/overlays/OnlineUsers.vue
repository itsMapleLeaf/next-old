<template>
  <overlay>
    <h2>Let's find some friends.</h2>
    <form class="ui form" @submit.prevent>
      <div class="ui field">
        <!-- checkboxes for filters here -->
      </div>
      <div class="ui field">
        <ul class="ui selection" style="">
          <li v-for="char in filterRelation('friend')" class="ui highlight green">
            <i class="fa fa-heart ui pull-right"></i>
            <character :character='char'></character>
          </li>
          <li v-for="char in filterRelation('bookmark')" class="ui highlight blue">
            <i class="fa fa-star ui pull-right"></i>
            <character :character='char'></character>
          </li>
          <li v-for="char in filterRelation('looking')">
            <i class="fa fa-paw ui pull-right"></i>
            <character :character='char'></character>
          </li>
          <li v-for="char in filterRelation()">
            <character :character='char'></character>
          </li>
        </ul>
      </div>
      <div class="ui field text-input icon right">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Search..." v-model="search" />
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

import {store} from 'modules/store'
import {CharacterRelation} from 'modules/types'

function compareNames (a, b) {
  return a.name.localeCompare(b.name)
}

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
      state: store.state
    }
  },

  created () {
    this.characters = store.getOnlineCharacters().sort(compareNames)
  },

  computed: {
  },

  methods: {
    filterRelation (relation?: CharacterRelation) {
      let filtered
      if (relation) {
        filtered = this.characters.filter(char => char.relation[0] === relation)
      } else {
        filtered = this.characters.filter(char => {
          const {relation} = char
          return !relation.includes('friend') &&
            !relation.includes('bookmark') &&
            !relation.includes('looking')
        })
      }
      return filtered
        .filter(char => char.name.includes(this.search))
        .slice(0, 100)
    }
  }
}
</script>
