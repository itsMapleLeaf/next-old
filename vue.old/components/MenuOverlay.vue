<template>
  <side-panel side="left">
    <div class='content' slot='content' @submit.prevent>
      <h2>{{greeting}}</h2>
      <div class='ui-field'>
        <character-avatar-link :character="character"></character-avatar-link>
      </div>
      <status-form></status-form>
    </div>

    <nav slot="options">
      <menu-option icon='forum' @click="openOverlay('channel-select-overlay')">Channels</menu-option>
      <menu-option icon='heart' @click="openOverlay('character-browser')">Online Users</menu-option>
      <menu-option icon='settings' @click="addNotice('This doesn\'t work yet.')">Settings</menu-option>
      <menu-option icon='account-switch' @click="switchCharacter">Switch Character</menu-option>
      <menu-option icon='logout' @click="logOut">Log Out</menu-option>
    </nav>
  </side-panel>
</template>

<style lang="stylus" scoped>
.ui-field
  margin-bottom: 0.6em

.content
  /*width: 11em*/
  padding: 1em 0.8em 0em
</style>

<script>
import SidePanel from './SidePanelOverlay.vue'
import CharacterAvatarLink from './CharacterAvatarLink.vue'
import MenuOption from './MenuOption.vue'
import Dropdown from './Dropdown.vue'
import StatusForm from './StatusForm.vue'

import {pushOverlay, popOverlay} from '../modules/vuex/actions'
import socket from '../modules/socket'

export default {
  components: {
    MenuOption,
    Dropdown,
    SidePanel,
    CharacterAvatarLink,
    StatusForm
  },

  vuex: {
    getters: {
      character: state => state.user.character
    },
    actions: {
      pushOverlay,
      popOverlay,

      openOverlay ({dispatch}, overlay) {
        dispatch('PopOverlay')
        dispatch('PushOverlay', overlay)
      },

      addNotice ({dispatch}, text) {
        dispatch('AddNewNotice', text)
      }
    }
  },

  methods: {
    logOut () {
      socket.disconnect()
      this.openOverlay('login-overlay')
    },

    switchCharacter () {
      socket.disconnect()
      this.openOverlay('character-select-overlay')
    }
  },

  computed: {
    greeting () {
      return `Hi, ${this.character.split(' ')[0]}!`
    }
  }
}
</script>
