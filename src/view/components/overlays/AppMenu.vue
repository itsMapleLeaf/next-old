<template>
  <action-panel side="left">
    <form slot="content">
      <h2>{{greeting}}</h2>
      <fieldset>
        <character-avatar-link :character="character"></character-avatar-link>
      </fieldset>
      <fieldset>
        <dropdown :init-value="status.state" @changed='setStatus'>
          <li value="online">Online</li>
          <li value="looking">Looking</li>
          <li value="busy">Busy</li>
          <li value="away">Away</li>
          <li value="dnd">DND</li>
        </dropdown>
      </fieldset>
      <fieldset class="ui-icon-right">
        <i class='fa fa-fw fa-pencil'></i>
        <div contenteditable placeholder="What's up?" v-el:status-message
          @blur='setStatusMessage($event.target.innerText)'
          @keydown.enter.prevent='$event.target.blur()'></div>
      </fieldset>
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

  ready () {
    this.$els.statusMessage.innerText = this.status.message
  },

  vuex: {
    getters: {
      userStatus: state => state.user.status,
      character: state => state.user.character
    },
    actions: {
      openOverlay (state, overlay) {
        state.dispatch('PopOverlay')
        state.dispatch('PushOverlay', overlay)
      }
    }
  },

  computed: {
    greeting () {
      return `Hi, ${this.character.split(' ')[0]}!`
    },

    profileURL () { return getProfileURL(this.character) },
    avatarURL () { return getAvatarURL(this.character) }
  },

  methods: {
    setStatus (status) {
      this.status.state = status
    },

    setStatusMessage (message) {
      this.status.message = message
    }
  }
}
</script>
