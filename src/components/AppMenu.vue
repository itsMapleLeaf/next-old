<template>
  <div class="ui overlay" @mousedown.self="closeAppMenu">
    <div class="ui side-panel left flex col">
      <div class="ui form flex fixed">
        <h2>{{greeting}}</h2>
        <div class="ui field">
          <div class="ui border hover-darken avatar">
            <a :href="profileURL" target="_blank">
              <img :src="avatarURL">
            </a>
          </div>
        </div>
        <div class="ui field">
          <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown>
        </div>
        <div class="ui field text-input icon right">
          <i class='fa fa-pencil'></i>
          <div contenteditable placeholder="What's up?"></div>
        </div>
      </div>
      <div class="flex stretch ui theme-color dark">
        <menu-option icon='globe' @mousedown="openChannelMenu">Channels</menu-option>
        <menu-option icon='gear'>Settings</menu-option>
        <menu-option icon='user'>Switch Character</menu-option>
        <menu-option icon='sign-out'>Log Out</menu-option>
      </div>
    </div>
  </div>
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
import MenuOption from './MenuOption.vue'
import Dropdown from './Dropdown.vue'
import state from '../state'
import {getProfileURL, getAvatarURL} from '../flist'

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
      return getProfileURL(this.state.getCharacter())
    },

    avatarURL () {
      return getAvatarURL(this.state.getCharacter())
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
