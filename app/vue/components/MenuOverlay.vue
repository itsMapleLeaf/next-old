<template>
  <side-panel side="left">
    <form slot="content">
      <h2>{{greeting}}</h2>
      <div class='ui-field'>
        <character-avatar-link :character="character"></character-avatar-link>
      </div>
      <div class='ui-field'>
        <dropdown :value="status" @input='statusChanged'>
          <a href='#' value="online">Online</a>
          <a href='#' value="looking">Looking</a>
          <a href='#' value="busy">Busy</a>
          <a href='#' value="away">Away</a>
          <a href='#' value="dnd">DND</a>
        </dropdown>
      </div>
      <div class="ui-field ui-input-icon">
        <i class='ui-icon mdi mdi-pencil'></i>
        <div contenteditable class='ui-input' style='word-wrap: break-word'
          placeholder="What's up?"
          @blur='statusMessage = $event.target.innerText'
          @keydown.enter.prevent='$event.target.blur()'
          :v-html.once='statusMessage'></div>
      </div>
      <div class='ui-field'>
        <button class='ui-button' style='font-size: 0.8em; padding: 0.3em 0.8em'>Update</button>
      </div>
    </form>

    <nav slot="options">
      <menu-option icon='forum' @mousedown="openOverlay('channel-select-overlay')">Channels</menu-option>
      <menu-option icon='heart' @mousedown="openOverlay('online-users-overlay')">Online Users</menu-option>
      <menu-option icon='settings'>Settings</menu-option>
      <menu-option icon='account-switch'>Switch Character</menu-option>
      <menu-option icon='logout'>Log Out</menu-option>
      <menu-option icon='information' @mousedown="openOverlay('about-overlay')">About</menu-option>
    </nav>
  </side-panel>
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
import SidePanel from './SidePanelOverlay.vue'
import CharacterAvatarLink from './CharacterAvatarLink.vue'
import MenuOption from './MenuOption.vue'
import Dropdown from './Dropdown.vue'

import {getProfileURL, getAvatarURL} from '../modules/flist'
import {pushOverlay, popOverlay} from '../modules/vuex/actions'
// import socket from '../modules/socket'

export default {
  components: {
    MenuOption,
    Dropdown,
    SidePanel,
    CharacterAvatarLink
  },

  data () {
    return {
      status: this.userStatus,
      statusMessage: this.userStatusMessage
    }
  },

  vuex: {
    getters: {
      userStatus: state => state.user.status,
      userStatusMessage: state => state.user.statusMessage,
      character: state => state.user.character
    },
    actions: {
      pushOverlay,
      popOverlay,

      openOverlay (store, overlay) {
        store.dispatch('PopOverlay')
        store.dispatch('PushOverlay', overlay)
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
    statusChanged (status) {
      this.status = status
    }
  }
}
</script>
