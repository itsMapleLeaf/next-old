<template>
  <div class="overlay-shade" @mousedown.self="setCurrentOverlay('')">
    <div class="side-panel fg-color material-shadow col">
      <div class="padded">
        <div class="avatar bg-color border-highlight"></div>
        <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown>
        <textarea type="text" placeholder="Status..."></textarea>
      </div>
      <div class="divider"></div>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/components'
@import '../styles/grid'
@import '../styles/variables'

.divider
  height: 1px
  width: 100%
  background: bg-color

.padded
  padding: 1.5em 1em 1em

.avatar
  size: 6em
  margin-bottom: 1.2em

textarea
  width: input-width
</style>
