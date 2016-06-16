<template>
  <div class="overlay-shade" @mousedown.self="setCurrentOverlay('')">
    <div class="side-panel fg-color material-shadow col">
      <div class="padded">
        <h2>Hi, {{ userCharacterName.split(' ')[0] }}!</h2>
        <div class="avatar bg-color border-highlight">
          <a :href="userProfileLocation" target="_blank">
            <img :src="avatarSource">
          </a>
        </div>
        <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown>
        <div contenteditable placeholder="What's up?"></div>
      </div>
      <div class="bg-color grow">
        <menu-option icon='globe' @mousedown="setCurrentOverlay('channel-list')">Channels</menu-option>
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
import {setCurrentOverlay} from '../vuex/actions'
import {userCharacterName} from '../vuex/getters'

export default {
  components: {
    MenuOption,
    Dropdown
  },

  computed: {
    statusDropdown () {
      // return ['online', 'looking', 'busy', 'away', 'dnd']
      return [
        { value: 'online', label: 'Online' },
        { value: 'looking', label: 'Looking' },
        { value: 'busy', label: 'Busy' },
        { value: 'away', label: 'Away' },
        { value: 'dnd', label: 'Do Not Disturb' }
      ]
    },

    avatarSource () {
      const encoded = encodeURI(this.userCharacterName.toLowerCase())
      return `https://static.f-list.net/images/avatar/${encoded}.png`
    },

    userProfileLocation () {
      const encoded = encodeURI(this.userCharacterName.toLowerCase())
      return `https://www.f-list.net/c/${encoded}`
    }
  },

  methods: {
    statusChanged () {
      // set character status
    }
  },

  vuex: {
    actions: {
      setCurrentOverlay
    },
    getters: {
      userCharacterName
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/components'
@require '../styles/grid'
@require '../styles/variables'

.divider
  height: 1px
  width: 100%
  background: bg-color

.padded
  padding: 1em 1em 0em

.avatar
  size: 120px
  box-sizing: content-box
  margin-bottom: input-spacing

  +transition(hover)
    border-highlight(lighten(fg-color, 40%))

  img
    size: 100%
</style>
