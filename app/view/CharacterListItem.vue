<template lang="jade">
.flex.flex-justify-space-between(:class='highlight')
  character(:character='character')
  span(v-if='icon')
    i(:class="'mdi mdi-' + icon")
</template>

<script>
import Character from './Character.vue'
import CharacterModel from '../models/Character'

export default {
  components: {Character},

  props: {
    character: CharacterModel,
    isOp: Boolean
  },

  computed: {
    highlight () {
      const {isFriend, isBookmark, isAdmin} = this.character
      const {isOp} = this
      const isLooking = this.character.status === 'looking'
      switch (true) {
        case isFriend:
          return 'highlight-green'
        case isBookmark:
          return 'highlight-blue'
        case isAdmin:
          return 'highlight-red'
        case isOp:
          return 'highlight-yellow'
      }
      return ''
    },

    icon () {
      return this.character.isFriend ? 'heart'
        : this.character.isBookmark ? 'star'
        : ''
    }
  }
}
</script>
