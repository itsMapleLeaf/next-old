<template>
  <div class="shade" @mousedown.self="closeAppMenu">
    <div class="box vertical side-panel fg-color shadow">
      <div class="box user-info">
        <h2>{{greeting}}</h2>
        <div class="avatar bg-color border-highlight">
          <a :href="profileURL" target="_blank">
            <img :src="avatarURL">
          </a>
        </div>
        <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown>
        <div contenteditable placeholder="What's up?"></div>
      </div>
      <div class="box vertical grow bg-color">
        <menu-option icon='globe' @mousedown="openChannelMenu">Channels</menu-option>
        <menu-option icon='gear'>Settings</menu-option>
        <menu-option icon='user'>Switch Character</menu-option>
        <menu-option icon='sign-out'>Log Out</menu-option>
      </div>
    </div>
  </div>
</template>

<script>
import MenuOption from './MenuOption.vue'
import Dropdown from './Dropdown.vue'
import state from '../state'
import * as util from '../util'

export default {
  components: {
    MenuOption,
    Dropdown
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
        { value: 'dnd', label: 'Do Not Disturb' }
      ]
    },

    greeting () {
      return `Hi, ${this.state.getCharacter().split(' ')[0]}!`
    },

    profileURL () {
      return util.getCharacterProfileURL(this.state.getCharacter())
    },

    avatarURL () {
      return util.getCharacterAvatarURL(this.state.getCharacter())
    }
  },

  methods: {
    statusChanged () {
      // set character status
    },

    openChannelMenu () {
      this.$dispatch('overlay-change-request', 'channel-list')
    },

    closeAppMenu () {
      this.$dispatch('overlay-change-request', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables'

.user-info
  padding: 1em 1em 0em

.avatar
  size: 100px
  margin: input-margin

  img
    size: 100%
</style>
