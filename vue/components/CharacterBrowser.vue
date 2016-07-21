<template>
  <div transition='fade'>
    <div class='ui-overlay-shade'></div>
    <div class='character-list ui-scroll'>
      <div class='character ui-color-main ui-border ui-raised' v-for='char in characterList'>
        <div class='image ui-color-dark flex-fixed'>
          <img :src='char.avatarURL' />
        </div>
        <div class='character-info flex-stretch'>
          <h3 class='name flex-fixed'>{{ char.name }}</h3>
          <small class='status flex-stretch'>
            <span>{{char.status}}</span>
            <span v-if='char.statusmsg' v-html="' - ' + char.statusmsg | bbcode"></span>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.character-list
  padding-top: 1em
  display: flex
  flex-wrap: wrap
  justify-content: center
  position: absolute
  height: 100vh
  width: 100vw

.character
  box-sizing: content-box
  width: 15em
  height: 100px
  margin-right: 1em
  margin-bottom: 1em
  display: flex

  img
    display: block

.character-info
  display: flex
  flex-direction: column
  word-wrap: break-word

.name, .status
  padding: 0.3em 0.6em

.name
  margin: 0

.status
  overflow: hidden
  text-overflow: ellipsis
  overflow-wrap: break-word
  font-style: italic
</style>

<script>
import Overlay from './Overlay.vue'
import {getAvatarURL} from '../modules/flist'
import {bbcode} from '../modules/filters'

export default {
  components: {Overlay},

  vuex: {
    getters: {
      characterMap: state => state.chat.characters
    }
  },

  computed: {
    characterList () {
      return Object.values(this.characterMap)
        .slice(0, 100)
        .map(char => {
          return {
            name: char.name,
            status: char.status,
            statusmsg: char.statusMessage,
            avatarURL: getAvatarURL(char.name)
          }
        })
    }
  },

  filters: {bbcode}
}
</script>
