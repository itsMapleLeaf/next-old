<template>
  <side-panel side="right">
    <div slot="content" class='content'>
      <h2 class="wrap-break-word">{{character.name}}</h2>
      <form slot="content">
        <div class='ui-field'>
          <character-avatar-link :character="character.name"></character-avatar-link>
        </div>
        <div class='ui-field'>
          <em class="ui-color-dark ui-border character-status" style="opacity: 0.8">
            {{character.gender}}, {{character.status}}
            <span v-if="character.statusMessage !== ''" v-html="'- ' + character.statusMessage | bbcode">
            </span>
          </em>
        </div>
        <template v-if="friends[character.name]">
          <div class="ui-field ui-highlight-green friend" v-for="friend in friends[character.name]">
            <em><i class="mdi mdi-heart"></i> {{friend}}</em>
          </div>
        </template>
      </form>
    </div>

    <div slot="options">
      <menu-option icon='message' @click='openPrivateChat'>Send Message</menu-option>

      <menu-option icon='star-outline' v-if='!bookmarks[character.name]' @click.prevent='toggleBookmark(character.name)'>Bookmark</menu-option>
      <menu-option icon='star' v-else @click.prevent='toggleBookmark(char.name)'>Unbookmark</menu-option>

      <menu-option icon='minus-circle-outline' v-if='!ignored[character.name]' @click.prevent='toggleIgnored(character.name)'>Ignore</menu-option>
      <menu-option icon='minus-circle' v-else @click.prevent='toggleIgnored(character.name)'>Unignore</menu-option>

      <menu-option icon='link-variant' :href="getProfileURL(character.name)" target="_blank">View Profile</menu-option>
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

  vuex: {
    getters: {
      character: state => state.ui.focusedCharacter,
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

  data () {
    return {
      getProfileURL,
      getAvatarURL
    }
  },

  methods: {
    openPrivateChat () {
      this.addPrivateChat(this.character.name)
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

  filters: {bbcode}
}
</script>
