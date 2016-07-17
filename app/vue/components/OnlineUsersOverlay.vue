<template>
  <overlay>
    <h2>Let's find some friends.</h2>
    <form>
      <div class='ui-field'>
        <div class="ui-select">
          <a href='#' v-for='char in sortedCharacters'>
            <character :character='char'></character>
          </a>
          <!-- <li v-for="char in filterRelation('friend')" class="ui-highlight-green">
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
          </li> -->
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
.ui-select {
  text-align: left;
  width: 16em;
  height: 20em;
}
</style>

<script>
import Character from './Character.vue'
import Dropdown from './Dropdown.vue'
import Overlay from './Overlay.vue'

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
      searchText: ''
    }
  },

  vuex: {
    getters: {
      characters: state => Object.values(state.chat.characters).slice()
    }
  },

  created () {
    // this.characters = store.getOnlineCharacterList().sort(compareNames)
  },

  computed: {
    sortedCharacters () {
      return this.characters
        .sort(compareNames)
        .filter(char => char.name.toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()))
        .slice(0, 300)
    }
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
