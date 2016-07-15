<template>
  <action-panel side="right">
    <div slot="content">
      <form slot="content">
        <h2 class="wrap-break-word">{{char.name}}</h2>
        <fieldset>
          <character-avatar-link :character="activeCharacter"></character-avatar-link>
        </fieldset>
        <fieldset>
          <em class="ui-color-dark ui-border ui-small">
            {{char.gender}}, {{char.status}}
            <span v-if="char.statusMessage !== ''" v-html="'- ' + char.statusMessage | bbcode"></span>
          </em>
        </fieldset>
        <fieldset class="ui-highlight-green" v-for="friend in friendships">
          <em><i class="fa fa-heart"></i> {{friend}}</em>
        </fieldset>
      </form>
    </div>
    <div slot="options">
      <menu-option icon='comment' @click='openPrivateChat'>Send Message</menu-option>

      <menu-option icon='star-o' v-if='!bookmarked' @click='state.addBookmark(char.name)'>Bookmark</menu-option>
      <menu-option icon='star' v-else @click='state.removeBookmark(char.name)'>Unbookmark</menu-option>

      <menu-option icon='minus-square-o' v-if='!ignored'>Ignore</menu-option>
      <menu-option icon='minus-square' v-else>Unignore</menu-option>

      <menu-option icon='link' :href="getProfileURL(char.name)">View Profile</menu-option>
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
// TODO: fix this shit
import MenuOption from '../elements/MenuOption.vue'
import ActionPanel from '../elements/ActionPanel.vue'
import CharacterAvatarLink from '../elements/CharacterAvatarLink.vue'

import {getProfileURL, getAvatarURL} from 'modules/flist'

export default {
  props: {
    activeCharacter: Object
  },

  components: {
    MenuOption,
    ActionPanel,
    CharacterAvatarLink
  },

  data () {
    return {
      getProfileURL,
      getAvatarURL
    }
  },

  methods: {
    openPrivateChat () {
      // store.notify('PrivateChatOpened', this.activeCharacter.name)
      this.close()
    },

    close () {
      // store.notify('PopOverlay')
    }
  },

  computed: {
    char () {
      return this.activeCharacter
    },

    friendships () {
      return store.getFriendship(this.char.name)
    },

    bookmarked () {
      return store.isBookmarked(this.char.name)
    },

    ignored () {
      return store.isIgnored(this.char.name)
    }
  }
}
</script>
