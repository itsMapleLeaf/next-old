<template>
  <action-panel side="right">
    <form slot="content" class="ui form">
      <h2 class="wrap-break-word">{{char.name}}</h2>
      <div class="ui field" style="margin-bottom: 0.8em">
        <a :href="getProfileURL(char.name)" style="display: inline-block">
          <img class="ui theme-color dark border hover-darken" :src='getAvatarURL(char.name)' />
        </a>
      </div>
      <div class="ui field wrap-break-word section">
        <em>
          {{char.status}}
          <span v-if="char.statusMessage !== ''" v-html="'- ' + char.statusMessage | bbcode"></span>
        </em>
      </div>
    </form>
    <div slot="options">
      <menu-option icon='comment'>Send Message</menu-option>
      <menu-option icon='heart'>Add Friend</menu-option>
      <menu-option icon='user-times'>Ignore</menu-option>
      <menu-option icon='link'>View Profile</menu-option>
    </div>
  </action-panel>
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
import ActionPanel from './ActionPanel.vue'
import {getProfileURL, getAvatarURL} from '../flist'

export default {
  props: {
    activeCharacter: Object
  },

  components: {
    MenuOption,
    ActionPanel
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
