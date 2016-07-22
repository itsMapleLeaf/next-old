<template>
  <a href='#' class='ui-color-main ui-border ui-raised' :data-character-action='character.name'>
    <div class='avatar ui-color-dark flex-fixed'>
      <img :src='avatarURL' />
    </div>
    <div class='character-info flex-stretch'>
      <h3 class='name flex-fixed ui-color-darker'>
        {{character.name}}
      </h3>
      <small class='status flex-stretch'>
        <span>{{character.status}}</span>
        <span v-if='character.statusmsg' v-html="' - ' + character.statusmsg | bbcode"></span>
      </small>
    </div>
  </a>
</template>

<style lang="stylus">
a > *
  pointer-events: none

.avatar
  padding: 0.5em

  img
    display: block

.character-info
  display: flex
  flex-direction: column
  word-wrap: break-word

.name, .status
  padding: 0.3rem 0.6rem

.name
  margin: 0

.status
  overflow: hidden
  text-overflow: ellipsis
  overflow-wrap: break-word
  font-style: italic
</style>

<script>
import Character from '../types/Character'
import {getAvatarURL} from '../modules/flist'

export default {
  props: {
    character: Character
  },

  computed: {
    avatarURL () {
      return getAvatarURL(this.character.name)
    }
  }
}
</script>
