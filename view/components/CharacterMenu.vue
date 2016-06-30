<template>
  <action-panel side="right">
    <form slot="content" class="ui form">
      <h2 class="wrap-break-word">{{char.name}}</h2>
      <div class="ui field">
        <character-avatar-link :character="activeCharacter"></character-avatar-link>
      </div>
      <small class="ui field wrap-break-word section">
        <em>
          {{char.status}}
          <span v-if="char.statusMessage !== ''" v-html="'- ' + char.statusMessage | bbcode"></span>
        </em>
      </small>
      <small class="ui field section highlight green" v-for="friend in friendships">
        <em><i class="fa fa-heart"></i> {{friend}}</em>
      </small>
    </form>
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
import MenuOption from './MenuOption.vue'
import ActionPanel from './ActionPanel.vue'
import CharacterAvatarLink from './CharacterAvatarLink.vue'
import {getProfileURL, getAvatarURL} from '../lib/flist'
import {OpenPrivateChatRequest, OverlayChangeRequest} from '../lib/events'
import state from '../lib/state'

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
      getAvatarURL,
      state
    }
  },

  methods: {
    openPrivateChat () {
      this.$dispatch(OpenPrivateChatRequest, this.activeCharacter.name)
      this.close()
    },

    close () {
      this.$dispatch(OverlayChangeRequest, '')
    }
  },

  computed: {
    char () {
      return this.activeCharacter
    },

    friendships () {
      return this.state.getFriendship(this.char.name)
    },

    bookmarked () {
      return this.state.isBookmarked(this.char.name)
    },

    ignored () {
      return this.state.isIgnored(this.char.name)
    }
  }
}
</script>
