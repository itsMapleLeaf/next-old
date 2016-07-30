<template>
  <side-menu right>
    <span slot='content'>
      <menu-header :character='character.name'>
        <span slot='header'>{{ character.name }}</span>
        <span slot='subtext' class='gender-color' :class='character.gender'>
          {{ capitalize(character.gender) }}
        </span>
      </menu-header>
      <em class='color-dark ui-block ui-small ui-padding-3 ui-margin-top-1'>
        <user-status :status='character.status' :statusmsg='character.statusmsg'></user-status>
      </em>
    </span>

    <span slot='options'>
      <menu-option icon='comment'>Send Message</menu-option>

      <menu-option :icon="character.isBookmark ? 'star' : 'star-outline'" :action='toggleBookmark'>
        {{ character.isBookmark ? 'Unbookmark' : 'Bookmark' }}
      </menu-option>

      <menu-option
        :icon="character.isIgnored ? 'minus-circle' : 'minus-circle-outline'"
        :action='toggleIgnored'>
        {{ character.isIgnored ? 'Unignore' : 'Ignore' }}
      </menu-option>

      <menu-option icon='link-variant'>View Profile</menu-option>
    </span>
  </side-menu>
</template>

<script>
import SideMenu from './SideMenu.vue'
import MenuHeader from './MenuHeader.vue'
import MenuOption from './MenuOption.vue'
import UserStatus from './UserStatus.vue'
import store from '../store'
import socket from '../socket'
import {capitalize} from '../util'

export default {
  components: {SideMenu, MenuHeader, MenuOption, UserStatus},

  data () {
    return { store, capitalize }
  },

  computed: {
    character () { return this.store.characterMenuFocus }
  },

  methods: {
    toggleBookmark () {
      if (this.character.isBookmark) {
        this.store.removeBookmark(this.character.name).catch(err => console.error(err))
      } else {
        this.store.addBookmark(this.character.name).catch(err => console.error(err))
      }
    },

    toggleIgnored () {
      const action = this.character.isIgnored ? 'delete' : 'add'
      socket.ignoreAction(this.character.name, action)
    }
  }
}
</script>
