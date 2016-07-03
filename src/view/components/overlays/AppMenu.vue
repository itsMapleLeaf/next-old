<template>
  <action-panel side="left">
    <form slot="content" class="ui form">
      <h2>{{greeting}}</h2>
      <div class="ui field">
        <character-avatar-link :character="state.getUserCharacter()"></character-avatar-link>
      </div>
      <div class="ui field">
        <dropdown :init-value="status" @changed='setStatus'>
          <li value="online">Online</li>
          <li value="looking">Looking</li>
          <li value="busy">Busy</li>
          <li value="away">Away</li>
          <li value="dnd">DND</li>
        </dropdown>
      </div>
      <div class="ui field text-input icon right">
        <i class='fa fa-pencil'></i>
        <div v-el:status-message contenteditable placeholder="What's up?"
          @blur='setStatusMessage($event.target.innerText)'
          @keydown.enter.prevent='$event.target.blur()'></div>
      </div>
    </form>

    <div slot="options">
      <menu-option icon='globe' @mousedown="pushOverlay('channel-list')">Channels</menu-option>
      <menu-option icon='heart' @mousedown="pushOverlay('online-users')">Online Users</menu-option>
      <menu-option icon='gear'>Settings</menu-option>
      <menu-option icon='user' @mousedown="switchCharacter">Switch Character</menu-option>
      <menu-option icon='sign-out' @mousedown="logOut">Log Out</menu-option>
      <menu-option icon='info' @mousedown="pushOverlay('about')">About</menu-option>
    </div>
  </action-panel>
</template>

<style lang="stylus" scoped>
.form
  padding: 0em 1em

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

import state from '../../lib/state'
import {getProfileURL, getAvatarURL} from '../../lib/flist'

import {
  PushOverlay,
  PopOverlay,
  LogoutRequest,
  SwitchCharacterRequest,
  StatusChange
} from '../../lib/events'

export default {
  components: {
    MenuOption,
    Dropdown,
    ActionPanel,
    CharacterAvatarLink
  },

  data () {
    const {status, statusMessage} = state.getUserStatus()
    return {
      status,
      statusMessage,
      state,
      interval: null,
      dirty: false
    }
  },

  ready () {
    this.$els.statusMessage.innerText = this.statusMessage

    // the server errors if we send too many status changes at once
    this.interval = window.setInterval(() => {
      if (this.dirty) {
        this.sendStatusChangeRequest()
        this.dirty = false
      }
    }, 2000)
  },

  destroyed () {
    window.clearInterval(this.interval)
  },

  computed: {
    character () {
      return this.state.getUserCharacterName()
    },

    greeting () {
      return `Hi, ${this.character.split(' ')[0]}!`
    },

    profileURL () {
      return getProfileURL(this.character)
    },

    avatarURL () {
      return getAvatarURL(this.character)
    }
  },

  methods: {
    setStatus (status) {
      this.status = status
      this.dirty = true
    },

    setStatusMessage (message) {
      this.statusMessage = message
      this.dirty = true
    },

    sendStatusChangeRequest () {
      this.$dispatch(StatusChange, this.status, this.statusMessage)
    },

    pushOverlay (overlay) {
      this.$dispatch(PopOverlay)
      this.$dispatch(PushOverlay, overlay)
    },

    switchCharacter () {
      this.$dispatch(SwitchCharacterRequest)
    },

    logOut () {
      this.$dispatch(LogoutRequest)
    }
  }
}
</script>
