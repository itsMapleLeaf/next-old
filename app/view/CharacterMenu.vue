<template lang="jade">
side-menu(right='')
  span(slot='content')
    menu-header(:character='character.name')
      span(slot='header') {{ character.name }}
      span.gender-color(slot='subtext', :class='character.gender')
        span {{ capitalize(character.gender) }}
    em.color-dark.ui-block.ui-small.ui-padding-3.ui-margin-top-1
      user-status(:status='character.status', :statusmsg='character.statusmsg')
  span(slot='options')
    menu-option(icon='comment', :action='openPrivateRoom')
      | Send Message
    menu-option(:icon="bookmarkIcon", :action='toggleBookmark')
      | {{ character.isBookmark ? 'Unbookmark' : 'Bookmark' }}
    menu-option(:icon="ignoredIcon", :action='toggleIgnored')
      | {{ character.isIgnored ? 'Unignore' : 'Ignore' }}
    menu-option(icon='link-variant', :href='character')
      | View Profile
</template>

<script>
import SideMenu from './SideMenu.vue'
import MenuHeader from './MenuHeader.vue'
import MenuOption from './MenuOption.vue'
import UserStatus from './UserStatus.vue'
import {store, state} from '../store'
import socket from '../socket'
import {capitalize} from '../util'

export default {
  components: {SideMenu, MenuHeader, MenuOption, UserStatus},

  data () {
    return { state, capitalize }
  },

  computed: {
    character () { return this.state.characterMenuFocus },
    bookmarkIcon () { return this.character.isBookmark ? 'star' : 'star-outline' },
    ignoredIcon () { return this.character.isIgnored ? 'minus-circle' : 'minus-circle-outline' }
  },

  methods: {
    toggleBookmark () {
      if (this.character.isBookmark) {
        store.removeBookmark(this.character.name).catch(err => console.error(err))
      } else {
        store.addBookmark(this.character.name).catch(err => console.error(err))
      }
    },

    toggleIgnored () {
      const action = this.character.isIgnored ? 'delete' : 'add'
      socket.ignoreAction(this.character.name, action)
    },

    openPrivateRoom () {
      const room = store.addPrivateRoom(this.character.name)
      store.setCurrentRoom(room)
      store.popOverlay()
    }
  }
}
</script>
