<template>
  <action-panel side="left">
    <form slot="content" class="ui form">
      <h2>{{greeting}}</h2>
      <div class="ui field">
        <character-avatar-link :character="state.getUserCharacter()"></character-avatar-link>
      </div>
      <div class="ui field">
        <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown>
      </div>
      <div class="ui field text-input icon right">
        <i class='fa fa-pencil'></i>
        <div contenteditable placeholder="What's up?"></div>
      </div>
    </form>

    <div slot="options">
      <menu-option icon='globe' @mousedown="openChannelMenu">Channels</menu-option>
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
import ActionPanel from './ActionPanel.vue'
import CharacterAvatarLink from './CharacterAvatarLink.vue'
import MenuOption from './MenuOption.vue'
import Dropdown from './Dropdown.vue'
import state from '../lib/state'
import {getProfileURL, getAvatarURL} from '../lib/flist'
import {OverlayChangeRequest} from '../lib/events'

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
    statusDropdown () {
      return [
        { value: 'online', label: 'Online' },
        { value: 'looking', label: 'Looking' },
        { value: 'busy', label: 'Busy' },
        { value: 'away', label: 'Away' },
        { value: 'dnd', label: 'DND' }
      ]
    },

    greeting () {
      return `Hi, ${this.state.getUserCharacterName().split(' ')[0]}!`
    },

    profileURL () {
      return getProfileURL(this.state.getUserCharacterName())
    },

    avatarURL () {
      return getAvatarURL(this.state.getUserCharacterName())
    }
  },

  methods: {
    statusChanged () {
      // set character status
    },

    openChannelMenu () {
      this.$dispatch(OverlayChangeRequest, 'channel-list')
    },

    closeAppMenu () {
      this.$dispatch(OverlayChangeRequest, '')
    }
  }
}
</script>
