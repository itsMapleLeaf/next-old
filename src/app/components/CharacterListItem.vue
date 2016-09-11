<template lang="pug">
.flex.flex-justify-space-between(:class='highlight')
  character(:character='character')
  span(v-if='icon')
    i(:class="'mdi mdi-' + icon")
</template>

<script>
import Character from './Character.vue'
import {state} from '../store.new'

export default {
  components: {
    Character
  },
  props: {
    character: Object,
    isOp: Boolean
  },
  computed: {
    name () { return this.character.name },
    isFriend () { return state.friends[this.name] != null },
    isBookmark () { return state.bookmarks[this.name] != null },
    isAdmin () { return state.admins[this.name] != null },

    highlight () {
      switch (true) {
        case this.isFriend:
          return 'highlight-green'
        case this.isBookmark:
          return 'highlight-blue'
        case this.isAdmin:
          return 'highlight-red'
        case this.isOp:
          return 'highlight-yellow'
        default:
          return ''
      }
    },

    icon () {
      return this.isFriend ? 'heart'
        : this.isBookmark ? 'star'
        : ''
    }
  }
}
</script>
