<template>
  <side-panel side="right">
    <div slot="content" class='content'>
      <h2 class="wrap-break-word">{{char.name}}</h2>
      <form slot="content">
        <div class='ui-field'>
          <character-avatar-link :character="char.name"></character-avatar-link>
        </div>
        <div class='ui-field'>
          <em class="ui-color-dark ui-border character-status" style="opacity: 0.8">
            {{char.gender}}, {{char.status}}
            <span v-if="char.statusMessage !== ''" v-html="'- ' + char.statusMessage | bbcode">
            </span>
          </em>
        </div>
        <template v-if="friends[char.name]">
          <div class="ui-field ui-highlight-green friend" v-for="friend in friends[char.name]">
            <em><i class="mdi mdi-heart"></i> {{friend}}</em>
          </div>
        </template>
      </form>
    </div>

    <div slot="options">
      <menu-option icon='message' @click='openPrivateChat'>Send Message</menu-option>

      <menu-option icon='star-outline' v-if='!bookmarks[char.name]' @click.prevent='toggleBookmark(char.name)'>Bookmark</menu-option>
      <menu-option icon='star' v-else @click.prevent='toggleBookmark(char.name)'>Unbookmark</menu-option>

      <menu-option icon='minus-circle-outline' v-if='!ignored[char.name]' @click.prevent='toggleIgnored(char.name)'>Ignore</menu-option>
      <menu-option icon='minus-circle' v-else @click.prevent='toggleIgnored(char.name)'>Unignore</menu-option>

      <menu-option icon='link-variant' :href="getProfileURL(char.name)" target="_blank">View Profile</menu-option>
    </div>
  </side-panel>
</template>

<style scoped>
.content {
  padding: 1em 1em 0em;
}

.wrap-break-word {
  word-wrap: break-word;
}

img {
  display: block;
}

.character-status {
  width: 12em;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
  display: block;
}

.friend {
  padding: 0.3em 0.6em;
  font-size: 0.8em;
}

.ui-field {
  margin-bottom: 0.8em;
}
</style>

<script>
// TODO: fix this shit
import MenuOption from './MenuOption.vue'
import SidePanel from './SidePanelOverlay.vue'
import CharacterAvatarLink from './CharacterAvatarLink.vue'

import {getProfileURL, getAvatarURL, addBookmark, removeBookmark} from '../modules/flist'
import {bbcode} from '../modules/filters'
import {popOverlay} from '../modules/vuex/actions'
import socket from '../modules/socket'

export default {
  components: {
    MenuOption,
    SidePanel,
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
      this.addPrivateChat(this.char.name)
      this.popOverlay()
    },

    toggleBookmark (name) {
      const {account, ticket} = this.auth
      if (!this.bookmarks[name]) {
        addBookmark(account, ticket, name).then(() => {
          this.$store.dispatch('AddBookmark', name)
        }).catch(err => {
          console.warn('error adding bookmark: ', err)
        })
      } else {
        removeBookmark(account, ticket, name).then(() => {
          this.$store.dispatch('RemoveBookmark', name)
        }).catch(err => {
          console.warn('error removing bookmark: ', err)
        })
      }
    },

    toggleIgnored (name) {
      if (!this.ignored[name]) {
        socket.ignore(name)
      } else {
        socket.unignore(name)
      }
    }
  },

  vuex: {
    getters: {
      char: state => state.ui.focusedCharacter,
      bookmarks: state => state.chat.bookmarks,
      friends: state => state.chat.friends,
      ignored: state => state.chat.ignored,
      auth: state => state.auth
    },

    actions: {
      popOverlay,
      addPrivateChat ({dispatch}, name) { dispatch('AddActivePrivateChat', name) }
    }
  },

  filters: {bbcode}
}
</script>
