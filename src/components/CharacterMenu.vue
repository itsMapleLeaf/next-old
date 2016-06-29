<template>
  <div class="ui overlay" @click.self="$dispatch('overlay-change-request', '')">
    <div class="ui side-panel right flex col">
      <div class="flex fixed">
        <form class="ui form">
          <h2 class="wrap-break-word">{{char.name}}</h2>
          <div class="ui field">
            <a :href="getProfileURL(char.name)" style="display: inline-block">
              <img :src='getAvatarURL(char.name)' />
            </a>
          </div>
          <div class="ui field wrap-break-word input">
            <em>
              {{char.status}}
              <span v-if="char.statusMessage !== ''" v-html="'- ' + char.statusMessage | bbcode"></span>
            </em>
          </div>
        </form>
      </div>
      <div class="flex stretch ui theme-color dark">
        <menu-option icon='comment'>Send Message</menu-option>
        <menu-option icon='heart'>Add Friend</menu-option>
        <menu-option icon='user-times'>Ignore</menu-option>
        <menu-option icon='link'>View Profile</menu-option>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.form
  padding: 0em 1em

.wrap-break-word
  word-wrap: break-word

img
  display: block
</style>

<script>
import MenuOption from './MenuOption.vue'
import {getProfileURL, getAvatarURL} from '../flist'

export default {
  props: {
    activeCharacter: Object
  },

  components: {
    MenuOption
  },

  data () {
    return {
      getProfileURL,
      getAvatarURL
    }
  },

  computed: {
    char () {
      return this.activeCharacter
    }
  }
}
</script>
