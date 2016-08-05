<template lang="jade">
.flex-column.flex-align-stretch.ui-fullscreen
  .color-main.ui-shadow-symmetric.flex-fixed.flex.flex-justify-center(style='z-index: 1')
    a.ui-link.ui-header-2.ui-margin-1(href='#', v-for='(group, index) in groups', :class="{ 'ui-faded': currentGroup !== index }", @click='currentGroup = index')
      | {{ group.title }}
    back-button(align='top', @click.native='close')
  .ui-shade.flex-grow.flex.flex-justify-center.flex-wrap.ui-scroll-y(style='align-content: flex-start', @click.self='close')
    card.color-dark(v-for='char in filteredCharacters', :character='char')
  .color-main.ui-shadow-symmetric.flex-fixed.flex.flex-center
    .ui-width-12.ui-header-2.ui-margin-1.ui-input-icon-left.ui-fit-viewport(style='background-color: transparent')
      i.ui-icon.mdi.mdi-magnify
      input.ui-border(v-model='searchText')
</template>

<script>
import Card from './CharacterBrowserCard.vue'
import BackButton from './BackButton.vue'
import store from '../store'
import * as util from '../util'

function compareNames (a, b) {
  return a.name.localeCompare(b.name)
}

function compareOnlineTime (a, b) {
  return a.onlineTime > b.onlineTime
}

export default {
  components: {Card, BackButton},

  data () {
    return {
      groups: [
        { title: 'Friends', list: () => this.friends.concat(this.bookmarks) },
        { title: 'Looking', list: () => this.looking },
        { title: 'All', list: () => this.sortCharacters(() => true) }
      ],
      currentGroup: 0,
      searchText: '',
      store
    }
  },

  methods: {
    sortCharacters (filter) {
      const search = this.searchText.toLowerCase()
      return this.allCharacters
        .filter(filter)
        .filter(char =>
          char.name.toLowerCase().includes(search) ||
          char.gender.toLowerCase().includes(search) ||
          char.status.toLowerCase().includes(search) ||
          char.statusmsg.toLowerCase().includes(search)
        )
        .sort(compareOnlineTime)
        .slice(0, 200)
    },

    close () {
      this.store.popOverlay()
    }
  },

  computed: {
    allCharacters () { return util.values(this.store.onlineCharacters) },
    friends () { return this.sortCharacters(char => char.isFriend) },
    bookmarks () { return this.sortCharacters(char => char.isBookmark) },
    looking () { return this.sortCharacters(char => char.status === 'looking') },

    filteredCharacters () {
      return this.groups[this.currentGroup].list()
    }
  }
}
</script>
