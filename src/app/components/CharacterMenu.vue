<template lang="pug">
side-menu(right)
  .color-dark(style="height: 100%")
    .color-main.ui-padding-5
      menu-header(:character='character.name')
        span(slot='header') {{ character.name }}
        span.gender-color(slot='subtext', :class='character.gender')
          span {{ capitalize(character.gender) }}
      em.color-dark.ui-block.ui-small.ui-padding-3.ui-margin-top-1
        user-status(:status='character.status', :statusmsg='character.statusmsg')
    div
      menu-option(icon="comment", @input='openPrivateRoom')
        | Send Message
      menu-option(:icon="bookmarkIcon", @input='toggleBookmark')
        | {{ character.isBookmark ? 'Unbookmark' : 'Bookmark' }}
      menu-option(:icon="ignoredIcon", @input='toggleIgnored')
        | {{ character.isIgnored ? 'Unignore' : 'Ignore' }}
      menu-option(icon='link-variant', :href='character')
        | View Profile
</template>

<script>
import SideMenu from './SideMenu.vue'
import MenuHeader from './MenuHeader.vue'
import MenuOption from './MenuOption.vue'
import UserStatus from './UserStatus.vue'
import * as store from '../store'
import {capitalize} from '../util'

export default {
  components: {SideMenu, MenuHeader, MenuOption, UserStatus},

  data () {
    return { state: store.state, capitalize }
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
      store.ignoreAction(this.character.name, action)
    },

    openPrivateRoom () {
      const room = store.addPrivateRoom(this.character.name)
      store.setCurrentRoom(room)
      store.popOverlay()
    }
  }
}
</script>
