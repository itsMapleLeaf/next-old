<template>
  <div class='flex-column flex-align-stretch ui-overlay'>
    <div class='flex-fixed flex flex-justify-center'>
      <a href='#' class='ui-link ui-margin-1 ui-faded'><h2>Friends</h2></a>
      <a href='#' class='ui-link ui-margin-1'><h2>Looking</h2></a>
      <a href='#' class='ui-link ui-margin-1 ui-faded'><h2>All</h2></a>
    </div>
    <div class='flex-grow flex flex-justify-center flex-wrap ui-scroll-y'>
      <a href='#' v-for='char in looking' class='flex ui-width-8 ui-shade ui-link ui-fit-viewport' style='height: 100px; margin: 0.5rem'>
        <img class='flex-fixed ui-block' :src='getAvatarURL(char.name)' />
        <div class='flex-grow flex-column' style='width: calc(100% - 100px); overflow-wrap: break-word'>
          <h3 class='flex-fixed ui-block ui-padding-2'>
            {{char.name}}
          </h3>
          <em class='flex-grow ui-block ui-small ui-padding-0' style='overflow-y: hidden'>
            <span class='status-color' :class='char.status'>{{char.status}}</span>
            <span v-html="' - ' + char.statusmsg" v-if='char.statusmsg'></span>
          </em>
        </div>
      </a>
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
        { title: 'Friends', characters: [] },
        { title: 'Looking', characters: [] },
        { title: 'All', characters: [] }
      ],
      store,
      getAvatarURL,
      getProfileURL
    }
  },

  methods: {
    filterCharacters (filter) {
      return util.values(this.store.onlineCharacters)
        .reverse()
        .filter(filter)
        .slice(0, 200)
        .sort(sortCharacters)
    }
  },

  computed: {
    friends () { return this.filterCharacters(char => char.isFriend) },
    bookmarks () { return this.filterCharacters(char => char.isBookmark) },
    looking () { return this.filterCharacters(char => char.status === 'looking') }
  }
}
</script>
