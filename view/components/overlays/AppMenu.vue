<template>
  <action-panel side="left">
    <form slot="content" class="ui form">
      <h2>{{greeting}}</h2>
      <div class="ui field">
        <character-avatar-link :character="state.getUserCharacter()"></character-avatar-link>
      </div>
      <div class="ui field">
        <dropdown>
          <li value="online">Online</li>
          <li value="looking">Looking</li>
          <li value="busy">Busy</li>
          <li value="away">Away</li>
          <li value="dnd">DND</li>
        </dropdown>
      </div>
      <div class="ui field text-input icon right">
        <i class='fa fa-pencil'></i>
        <div contenteditable placeholder="What's up?"></div>
      </div>
    </form>

    <div slot="options">
      <menu-option icon='globe' @mousedown="openChannelMenu">Channels</menu-option>
      <menu-option icon='heart' @mousedown="openOnlineUsers">Online Users</menu-option>
      <menu-option icon='gear'>Settings</menu-option>
      <menu-option icon='user'>Switch Character</menu-option>
      <menu-option icon='sign-out'>Log Out</menu-option>
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
import {PushOverlay, PopOverlay} from '../../lib/events'

export default {
  components: {
    MenuOption,
    Dropdown,
    ActionPanel,
    CharacterAvatarLink
  },

  data () {
    return { state }
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
    statusChanged () {
      // set character status
    },

    openChannelMenu () {
      this.$dispatch(PopOverlay)
      this.$dispatch(PushOverlay, 'channel-list')
    },

    openOnlineUsers () {
      this.$dispatch(PopOverlay)
      this.$dispatch(PushOverlay, 'online-users')
    }
  }
}
</script>
