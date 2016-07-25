<template>
  <div class='col-3 flex color-main ui-border'>
    <!-- avatar -->
    <div class='color-dark ui-cursor-pointer ui-padding-square'>
      <img class='block' :src='avatarURL' :data-character-action='character.name' />
    </div>

    <div class='flex-auto flex flex-column'>
      <!-- name -->
      <div class='color-darker'> <!-- darker background -->
        <div :class='relationClass'>
          <a class='ui-ellipsis' href='#' :data-character-action='character.name'>
            {{character.name}}
          </a>
          <span>
            <i class='mdi mdi-heart' v-if="character.isFriend"></i>
            <i class='mdi mdi-star' v-if="character.isBookmarked"></i>
          </span>
        </div>
      </div>

      <!-- status -->
      <div class='table-row ui-scroll'>
        <small>
          <span class='status-color' :class="character.status.toLowerCase()">
            {{character.status}}
          </span>
          <span
            v-if='character.statusMessage'
            v-html="' - ' + character.statusMessage | bbcode">
          </span>
        </small>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
</style>

<script>
import Character from '../types/Character'
import {getAvatarURL} from '../modules/flist'
import {bbcode} from '../modules/filters'

export default {
  props: {
    character: Character
  },

  computed: {
    avatarURL () {
      return getAvatarURL(this.character.name)
    },

    relationClass () {
      const char = this.character
      if (char.isFriend) {
        return 'ui-highlight-green'
      } else if (char.isBookmarked) {
        return 'ui-highlight-blue'
      }
      return ''
    },

    iconClass () {
      const char = this.character
      return {
        'mdi-heart': char.isFriend,
        'mdi-star': char.isBookmarked
      }
    }
  },

  filters: {bbcode}
}
</script>
