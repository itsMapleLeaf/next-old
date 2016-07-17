<template>
  <overlay>
    <h2>Let's find some friends.</h2>
    <form>
      <fieldset>
        <ul class="ui-selection" style="">
          <li v-for="char in filterRelation('friend')" class="ui-highlight-green">
            <i class="mdi mdi-heart pull-right"></i>
            <character :character='char'></character>
          </li>
          <li v-for="char in filterRelation('bookmark')" class="ui-highlight-blue">
            <i class="mdi mdi-star pull-right"></i>
            <character :character='char'></character>
          </li>
          <li v-for="char in filterRelation('looking')">
            <i class="mdi mdi-paw pull-right"></i>
            <character :character='char'></character>
          </li>
          <li v-for="char in filterRelation()">
            <character :character='char'></character>
          </li>
        </ul>
      </fieldset>
      <fieldset class="ui-icon-right">
        <i class="mdi mdi-search"></i>
        <input type="text" placeholder="Search..." v-model="search" />
      </fieldset>
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
import Character from './Character.vue'
import Dropdown from './Dropdown.vue'
import Overlay from './Overlay.vue'

// function compareNames (a, b) {
//   return a.name.localeCompare(b.name)
// }

export default {
  components: {
    Character,
    Dropdown,
    Overlay
  },

  data () {
    return {
      characters: [],
      search: ''
    }
  },

  vuex: {
    getters: {
      characters: state => Object.values(state.chat.characters)
    }
  },

  created () {
    // this.characters = store.getOnlineCharacterList().sort(compareNames)
  },

  computed: {
  },

  methods: {
    // filterRelation (relation?: CharacterRelation) {
    //   let filtered
    //   if (relation) {
    //     filtered = this.characters.filter(char => char.relation[0] === relation)
    //   } else {
    //     filtered = this.characters.filter(char => {
    //       const {relation} = char
    //       return !relation.includes('friend') &&
    //         !relation.includes('bookmark') &&
    //         !relation.includes('looking')
    //     })
    //   }
    //   return filtered
    //     .filter(char => char.name.includes(this.search))
    //     .slice(0, 100)
    // }
  }
}
</script>
