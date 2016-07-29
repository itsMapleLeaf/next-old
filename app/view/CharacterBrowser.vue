<template>
  <div class='flex-column flex-align-center ui-overlay'>
    <div class='flex-fixed flex flex-justify-center'>
      <a href='#' v-for='(group, index) in groups'
        class='ui-link ui-header-2 ui-margin-1'
        :class="{ 'ui-faded': currentGroup !== index }"
        @click="currentGroup = index">
        {{ group.title }}
      </a>

      <!-- <a href='#' class='ui-link ui-margin-1 ui-faded'><h2>Friends</h2></a>
      <a href='#' class='ui-link ui-margin-1'><h2>Looking</h2></a>
      <a href='#' class='ui-link ui-margin-1 ui-faded'><h2>All</h2></a> -->
    </div>
    <div class='flex-grow flex flex-justify-center flex-wrap ui-scroll-y' style='align-content: flex-start'>
      <a href='#' v-for='char in groups[currentGroup].list()' class='flex ui-width-8 ui-shade ui-link ui-fit-viewport' style='height: 100px; margin: 0.5rem'>
        <img class='flex-fixed ui-block' :src='getAvatarURL(char.name)' />
        <div class='flex-grow flex-column' style='width: calc(100% - 100px); overflow-wrap: break-word'>
          <h3 class='flex-fixed ui-block ui-padding-2'>
            {{ char.name }}
          </h3>
          <em class='flex-grow ui-block ui-small ui-padding-0' style='overflow-y: hidden'>
            <span class='status-color' :class='char.status'>{{ char.status }}</span>
            <span v-html="' - ' + char.statusmsg" v-if='char.statusmsg'></span>
          </em>
        </div>
      </a>
    </div>
    <div class='flex-fixed ui-width-12 ui-header-2 ui-margin-1 ui-input-icon-left ui-fit-viewport' style='background-color: transparent'>
      <i class='ui-icon mdi mdi-magnify'></i>
      <input class='ui-border' />
    </div>
  </div>
</template>

<script>
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
  components: {},

  data () {
    return {
      groups: [
        { title: 'Friends', list: () => this.friends.concat(this.bookmarks) },
        { title: 'Looking', list: () => this.looking },
        { title: 'All', list: () => this.allCharacters.slice(0, 200).sort(compareNames) }
      ],
      currentGroup: 0,
      store,
      getAvatarURL,
      getProfileURL
    }
  },

  methods: {
    filterCharacters (filter) {
      return this.allCharacters
        // .reverse()
        .filter(filter)
        .slice(0, 200)
        .sort(sortCharacters)
    }
  },

  computed: {
    friends () { return this.filterCharacters(char => char.isFriend) },
    bookmarks () { return this.filterCharacters(char => char.isBookmark) },
    looking () { return this.filterCharacters(char => char.status === 'looking') },
    allCharacters () { return util.values(this.store.onlineCharacters) }
  }
}
</script>
