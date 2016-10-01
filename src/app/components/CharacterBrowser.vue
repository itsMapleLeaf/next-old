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
      <a href='#' @click='showStats = true'>
        <i class='mdi mdi-chart-bar'></i>
      </a>
    </div>
    <a href='#' class='close-button' @click="$emit('closed')">
      <i class='mdi mdi-close'></i>
    </a>
    <transition name='fade'>
      <CharacterStats v-if='showStats' @closed='showStats = false' />
    </transition>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Status from './Status.vue'
import Toggle from './Toggle.vue'
import CharacterStats from './CharacterStats.vue'
import {store, state} from '../store'
import {values} from '../lib/util'

const weights = { friend: 0, bookmark: 1, looking: 2 }
const highlights = { friend: 'name-highlight-friend', bookmark: 'name-highlight-bookmark' }
const icons = { friend: 'heart', bookmark: 'star' }

function lower(str) {
  return str.toLocaleLowerCase()
}

function kindof(char) {
  return store.isFriend(char.name) ? 'friend'
    : store.isBookmark(char.name) ? 'bookmark'
    : char.status === 'looking' ? 'looking'
    : 'none'
}

function getSortWeight(char) {
  return weights[kindof(char)] || 3
}

function compareField(a, b, field) {
  return a[field].localeCompare(b[field])
}

function compareCharacters(a, b) {
  const diff = getSortWeight(a) - getSortWeight(b)
  return diff !== 0 ? diff : compareField(a, b, 'name')
}

export default {
  components: {
    Avatar,
    Status,
    Toggle,
    CharacterStats,
  },
  data() {
    return {
      searchText: '',
      characters: [],
      showStats: false,
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
    nameHighlight(char) {
      return highlights[kindof(char)] || ''
    },
    characterIcon(char) {
      return icons[kindof(char)] || ''
    },
    filterCharacter(char) {
      const search = lower(this.searchText)
      const isFriendSearch = search === 'friend' || search === 'friends'
      const isBookmarkSearch = search === 'bookmark' || search === 'bookmarks'
      return lower(char.name).includes(search)
        || lower(char.gender) === search
        || lower(char.status) === search
        || lower(char.statusmsg).includes(search)
        || isFriendSearch && store.isFriend(char.name)
        || isBookmarkSearch && store.isBookmark(char.name)
    },
    getCharacterList() {
      this.characters = values(state.onlineCharacters)
        .filter(this.filterCharacter)
        .sort(compareCharacters)
        .slice(0, 200)
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'flex'
@require 'character'
@require 'form'
@require 'link'
@require 'layout'
@require 'theme'
@require 'highlight'
@require 'animate'
@require 'fade'

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
  box-shadow: 0px 0px 8px rgba(black, 0.8)
  text-align: center

.category
  margin-right: 0.8em

.character
  accent-border(bottom)
  background: $theme-color
  margin: 0.7em
  box-sizing: content-box
  transition: 0.2s

  &:hover
    transform: translateY(-0.3em)

.user-info
  size(10em, 6em)

.name
  background: theme-darker(50%)

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
  word-break: break-word

.close-button
  anchor(top right)
  padding: 0.5rem
  opacity: 0.5
  transition: 0.2s
  font-size: 120%

  &:hover
    opacity: 1
</style>
