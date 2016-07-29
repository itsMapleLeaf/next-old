<template>
  <div class='ui-overlay' @click.self='close'>
    <div class='ui-panel-right ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <menu-header :character='character.name'>
          <span slot='header'>{{ character.name }}</span>
          <span slot='subtext' class='gender-color' :class='character.gender'>
            {{ capitalize(character.gender) }}
          </span>
        </menu-header>
        <em class='color-dark ui-block ui-small ui-padding-3 ui-margin-top-1'>
          <user-status :status='character.status' :statusmsg='character.statusmsg'></user-status>
        </em>
      </section>

      <section class='flex-grow color-dark'>
        <menu-option icon='comment'>Send Message</menu-option>

        <menu-option icon='star' v-if='character.isBookmark'>Unbookmark</menu-option>
        <menu-option icon='star-outline' v-else>Bookmark</menu-option>

        <menu-option icon='minus-circle' v-if='character.isIgnored'>Unignore</menu-option>
        <menu-option icon='minus-circle-outline' v-else>Ignore</menu-option>

        <menu-option icon='link-variant'>View Profile</menu-option>
      </section>
    </div>
  </div>
</template>

<script>
import MenuHeader from './MenuHeader.vue'
import MenuOption from './MenuOption.vue'
import UserStatus from './UserStatus.vue'
import store from '../store'
import {capitalize} from '../util'

export default {
  components: {MenuHeader, MenuOption, UserStatus},

  data () {
    return { store, capitalize }
  },

  computed: {
    character () { return this.store.characterMenuFocus }
  },

  methods: {
    close () {
      this.store.popOverlay()
    }
  }
}
</script>
