<template>
  <action-panel side="left">
    <form slot="content">
      <h2>{{greeting}}</h2>
      <div class='ui-field'>
        <character-avatar-link :character="character"></character-avatar-link>
      </div>
      <div class='ui-field'>
        <dropdown :init-value="status.state" @changed='setStatus'>
          <a href='#' value="online">Online</a>
          <a href='#' value="looking">Looking</a>
          <a href='#' value="busy">Busy</a>
          <a href='#' value="away">Away</a>
          <a href='#' value="dnd">DND</a>
        </dropdown>
      </div>
      <div class="ui-field ui-input-icon">
        <i class='ui-icon fa fa-fw fa-pencil'></i>
        <div contenteditable class='ui-input' style='word-wrap: break-word'
          placeholder="What's up?"
          @blur='setStatusMessage($event.target.innerText)'
          @keydown.enter.prevent='$event.target.blur()'>{{* status.message}}</div>
      </div>
    </form>

    <nav slot="options">
      <menu-option icon='globe' @mousedown="openOverlay('channel-list')">Channels</menu-option>
      <menu-option icon='heart' @mousedown="openOverlay('online-users')">Online Users</menu-option>
      <menu-option icon='gear'>Settings</menu-option>
      <menu-option icon='user'>Switch Character</menu-option>
      <menu-option icon='sign-out'>Log Out</menu-option>
      <menu-option icon='info' @mousedown="openOverlay('about')">About</menu-option>
    </nav>
  </action-panel>
</template>

<style lang="stylus" scoped>
form
  width: 11rem
  padding: 1em 1em 0em

.avatar
  display: inline-block

img
  display: block
</style>

<script>
import ActionPanel from '../elements/ActionPanel.vue'
import CharacterAvatarLink from '../elements/CharacterAvatarLink.vue'
import MenuOption from '../elements/MenuOption.vue'
import Dropdown from '../elements/Dropdown.vue'

import {getProfileURL, getAvatarURL} from 'modules/flist'
import {pushOverlay, popOverlay} from '../../vuex/actions'
import socket from 'modules/socket'

export default {
  components: {
    MenuOption,
    Dropdown,
    ActionPanel,
    CharacterAvatarLink
  },

  data () {
    return {
      status: this.userStatus
    }
  },

  vuex: {
    getters: {
      userStatus: state => state.user.status,
      character: state => state.user.character
    },
    actions: {pushOverlay, popOverlay}
  },

  computed: {
    greeting () {
      return `Hi, ${this.character.split(' ')[0]}!`
    },

    profileURL () { return getProfileURL(this.character) },
    avatarURL () { return getAvatarURL(this.character) }
  },

  methods: {
    openOverlay (store, overlay) {
      store.dispatch('PopOverlay')
      store.dispatch('PushOverlay', overlay)
    },

    setStatus (status) {
      this.status.state = status
    },

    setStatusMessage (message) {
      this.status.message = message
    }
  }
}
</script>
