<template>
  <div class='container ui-overlay-shade ui-scroll' transition='fade'>
    <div class='character-list'>
      <card v-for='char in groups.friends' class='character' :character='char'></card>
      <card v-for='char in groups.bookmarks' class='character' :character='char'></card>
      <card v-for='char in groups.looking' class='character' :character='char'></card>
      <card v-for='char in groups.rest' class='character' :character='char'></card>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  position: absolute
  height: 100vh
  width: 100vw
  padding-top: 1em

.character-list
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: flex-start

.character
  box-sizing: content-box
  width: 15em
  height: min-content
  margin-right: 1em
  margin-bottom: 1em
  display: flex
</style>

<script>
import Overlay from './Overlay.vue'
import Card from './CharacterBrowserCard.vue'
import {bbcode} from '../modules/filters'
import {groupSort, compareByField} from '../modules/common'

const compareName = compareByField('name')

export default {
  components: {Overlay, Card},

  vuex: {
    getters: {
      characterMap: state => state.chat.characters
    }
  },

  computed: {
    groups () {
      const characters = Object.values(this.characterMap)
      const sorted = groupSort(characters, char => {
        switch (true) {
          case char.getFriends().length > 0: return 'friends'
          case char.isBookmarked(): return 'bookmarks'
          case char.status === 'looking': return 'looking'
          default: return 'rest'
        }
      })

      for (let group in sorted) {
        sorted[group] = sorted[group]
          .slice(0, 200)
          .sort(compareName)
      }

      return sorted
    }
  },

  filters: {bbcode}
}
</script>
