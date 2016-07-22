<template>
  <div class='card flex-row ui-color-main ui-border'>
    <div class='avatar ui-color-dark flex-fixed'>
      <img :src='avatarURL' />
    </div>
    <div class='character-info flex-column flex-stretch'>
      <h4 class='flex-fixed ui-color-darker'>
        <div class='name flex-row' style='justify-content: space-between' :class='relationClass'>
          <span>{{character.name}}</span>
          <span v-if="iconClass"><i class='mdi' :class="iconClass"></i></span>
        </div>
      </h4>
      <div class='status'>
        <small>
          <span>{{character.status}}</span>
          <span v-if='character.statusMessage' v-html="' - ' + character.statusMessage | bbcode"></span>
        </small>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.card
  width: 16em
  height: calc(100px + 1em)
  display: flex

.avatar
  padding: 0.5em

  img
    display: block

.name span, .status
  padding: 0.3rem 0.6rem

h4
  margin: 0

.status
  overflow: hidden
  font-style: italic
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
      if (char.isFriend()) {
        return 'ui-highlight-green'
      } else if (char.isBookmarked()) {
        return 'ui-highlight-blue'
      }
      return ''
    },

    iconClass () {
      const char = this.character
      return {
        'mdi-heart': char.isFriend(),
        'mdi-star': char.isBookmarked()
      }
    }
  },

  filters: {bbcode}
}
</script>
