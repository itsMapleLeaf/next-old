<template>
  <div class='flex-column flex-align-center ui-overlay'>
    <back-button align='top' @click.native='close'></back-button>
    <div class='flex-fixed flex flex-justify-center'>
      <a href='#' v-for='(group, index) in groups'
        class='ui-link ui-header-2 ui-margin-1' :class="{ 'ui-faded': currentGroup !== index }"
        @click="currentGroup = index">
        {{ group.title }}
      </a>

      <!-- <a href='#' class='ui-link ui-margin-1 ui-faded'><h2>Friends</h2></a>
      <a href='#' class='ui-link ui-margin-1'><h2>Looking</h2></a>
      <a href='#' class='ui-link ui-margin-1 ui-faded'><h2>All</h2></a> -->
    </div>
    <div class='flex-grow flex flex-justify-center flex-wrap ui-scroll-y' style='align-content: flex-start'>
      <card v-for='char in filteredCharacters' :character='char'></card>
    </div>
    <div class='flex-fixed ui-width-12 ui-header-2 ui-margin-1 ui-input-icon-left ui-fit-viewport' style='background-color: transparent'>
      <i class='ui-icon mdi mdi-magnify'></i>
      <input class='ui-border' v-model='searchText' />
    </div>
  </div>
</template>

<script>
import Card from './CharacterBrowserCard.vue'
import BackButton from './BackButton.vue'
import store from '../store'
import {getAvatarURL, getProfileURL} from '../f-list'
import * as util from '../util'

function getSortPriority (char) {
  return char.isFriend ? 3
    : char.isBookmark ? 2
    : char.status === 'looking' ? 1
    : 0
}

function comparePriority (a, b) {
  return getSortPriority(b) - getSortPriority(a)
}

function compareNames (a, b) {
  return a.name.localeCompare(b.name)
}

function sortCharacters (a, b) {
  return compareNames(a, b) + comparePriority(a, b)
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
      store,
      getAvatarURL,
      getProfileURL
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
        .slice(0, 200)
        .sort(sortCharacters)
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
