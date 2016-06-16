<template>
  <div class="overlay-shade" @mousedown.self="setCurrentOverlay('')">
    <div class="side-panel fg-color material-shadow col">
      <div class="padded">
        <div class="avatar bg-color border-highlight"></div>
        <input type="text" placeholder="status">
        <input type="text" placeholder="Status...">
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
import {setCurrentOverlay} from '../vuex/actions'

export default {
  components: {
    MenuOption
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
</style>
