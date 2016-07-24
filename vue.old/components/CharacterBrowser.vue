<template>
  <div class='container ui-overlay-shade ui-scroll' transition='fade'>
    <div class='character-list'>
      <card v-for='char in groups.friends || []' class='character' :character='char'></card>
      <card v-for='char in groups.bookmarks || []' class='character' :character='char'></card>
      <card v-for='char in groups.looking || []' class='character' :character='char'></card>
      <card v-for='char in groups.rest || []' class='character' :character='char'></card>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  position: absolute
  width: 100vw
  display: flex
  flex-direction: column
  align-items: center

.character-list
  padding: 0.4em
  max-width: 70em
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: flex-start

.character
  margin: 0.4em
</style>

<script>
import Overlay from './Overlay.vue'
import Card from './CharacterBrowserCard.vue'
import {groupSort, compareByField} from '../modules/common'

const compareName = compareByField('name')

function compareOnlineTime (a, b) {
  return a.onlineSince - b.onlineSince
}

export default {
  components: {Overlay, Card},

  vuex: {
    getters: {
      characterMap: state => state.chat.characters
    }
  },

  data () {
    return { groups: {} }
  },

  ready () {
    this.groups = this.createGroups()
  },

  methods: {
    createGroups () {
      const characters = Object.values(this.characterMap)
      const sorted = groupSort(characters, char => {
        switch (true) {
          case char.isFriend: return 'friends'
          case char.isBookmarked: return 'bookmarks'
          case char.status === 'looking': return 'looking'
          default: return 'rest'
        }
      })

      for (let group in sorted) {
        sorted[group] = sorted[group]
          .sort(compareOnlineTime)
          .slice(0, 150)
          .sort(compareName)
      }

      return sorted
    }
  }
}
</script>
