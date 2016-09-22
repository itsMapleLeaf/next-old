<template>
  <div class='shade' @click.self="$emit('closed')">
    <a href='#' class='character' v-for='char in characters' :data-character='char.name'>
      <div class='flex-row'>
        <Avatar :name='char.name' size='6em'></Avatar>
        <div class='user-info flex-column'>
          <div class='name flex-fixed'>
            <h4 class='name-text' :class='nameHighlight(char)'>
              <span class='name-icon'>
                <i v-if='characterIcon(char)' :class="'mdi mdi-' + characterIcon(char)"></i>
              </span>
              <span :class="'character-gender-' + char.gender.toLowerCase()">
                {{ char.name }}
              </span>
            </h4>
          </div>
          <div class='status flex-grow'>
            <Status :status='char.status' :statusmsg='char.statusmsg'></Status>
          </div>
        </div>
      </div>
    </a>
    <div class='header'>
      <div class='search form-icon-input'>
        <i class='mdi mdi-magnify'></i>
        <input placeholder='Search...' v-model='searchText'>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Status from './Status.vue'
import Toggle from './Toggle.vue'
import {store, state} from '../store'

export default {
  components: {
    Avatar,
    Status,
    Toggle,
  },
  data() {
    return {
      searchText: '',
      characters: [],
    }
  },
  mounted() {
    let timeout
    this.$watch('searchText', () => {
      if (timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(this.getCharacterList, 1000)
    })
    this.getCharacterList()
  },
  methods: {
    getSortWeight(char) {
      const {name, status} = char
      switch (true) {
        case store.isFriend(name):
          return 0
        case store.isBookmark(name):
          return 1
        case status === 'looking':
          return 2
        default:
          return 3
      }
    },
    compareCharacters(a, b) {
      const diff = this.getSortWeight(a) - this.getSortWeight(b)
      return diff !== 0 ? diff : a.name.localeCompare(b.name)
    },
    nameHighlight(char) {
      return store.isFriend(char.name) ? 'name-highlight-friend'
        : store.isBookmark(char.name) ? 'name-highlight-bookmark'
        : ''
    },
    characterIcon(char) {
      return store.isFriend(char.name) ? 'heart'
        : store.isBookmark(char.name) ? 'star'
        : ''
    },
    getSearchQuery(char) {
      return [
        char.name,
        char.gender,
        char.status,
        char.statusmsg,
        store.isFriend(char.name) ? 'friends' : '',
        store.isBookmark(char.name) ? 'bookmarks' : '',
      ].join(' ').toLowerCase()
    },
    filterCharacter(char) {
      return this.getSearchQuery(char).includes(this.searchText.toLowerCase())
    },
    getCharacterList() {
      this.characters = Object.values(state.onlineCharacters)
        .filter(this.filterCharacter)
        .sort(this.compareCharacters)
        .slice(0, 200)
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'elements/flex'
@require 'elements/character'
@require 'elements/form'
@require 'elements/link'
@require 'mixins/flex'
@require 'mixins/layout'
@require 'mixins/theme'
@require 'mixins/highlight'

.shade
  fullscreen()
  flex-align(center, flex-start)
  background: rgba(black, 0.8)
  flex-wrap: wrap
  overflow-y: auto
  padding: 1em 1em 4em
  align-content: flex-start

.header
  anchor(bottom left right)
  position: fixed
  background: $theme-color
  padding: 0.5em 1em

.category
  margin-right: 0.8em

.search
  float: right

.character
  background: $theme-color
  margin: 0.7em
  box-sizing: content-box
  accent-border(bottom)

  +animate(hover)
    transform: translateY(-0.3em)

.user-info
  size(10em, 6em)

.name
  background: theme-darker(30%)

.name-text
  padding: 0.3em 0.6em

.name-icon
  float: right

.name-highlight-friend
  highlight($green)

.name-highlight-bookmark
  highlight($blue)

.status
  padding: 0.3em 0.6em
  background: theme-darker(20%)
  font-size: 80%
  font-style: italic
  overflow-y: auto
  min-height: 0
</style>
