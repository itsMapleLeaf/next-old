<template lang="pug">
mixin icon-link(icon, action)
  a(href='#', @click!=action)&attributes(attributes)
    i.mdi(class='mdi-' + icon)

mixin info-icon
  transition(name='fade')
    a.ui-padding-subtle(href='#', style='z-index: 3', v-show="!state.overlays.includes('about')",
      @click="pushOverlay('about')")
      i.mdi.mdi-information.ui-faded

mixin menu-icon
  a(href='#', @click="pushOverlay('user-menu')")
    i.mdi.mdi-menu

mixin notification-icon
  a(href='#', @click="notificationIconClicked")
    i.mdi(:class="'mdi-' + bellIcon")

mixin app-info
  span F-Chat Next
  small.ui-faded  v{{ version }}

.flex-row.flex-justify-space-between.flex-align-center.ui-padding-3
  //- .flex-fixed.res.res-mobile
    +menu-icon
  .flex-fixed
    .res.res-desktop
      h1(style="display: inline")
        +app-info
      +info-icon
    .res.res-mobile
      +app-info
      +info-icon
  .flex-fixed
    +notification-icon
</template>

<script>
import {getAvatarURL} from '../f-list'
import {state, pushOverlay, resetUnreadMessageCount} from '../store'
import {version} from '../../../package.json'

export default {
  data () {
    return {
      version,
      state
    }
  },
  methods: {
    getAvatarURL,
    pushOverlay,

    notificationIconClicked () {
      pushOverlay('notification-log')
      resetUnreadMessageCount()
    }
  },
  computed: {
    bellIcon () {
      return this.state.unreadMessageCount > 0 ? 'bell' : 'bell-outline'
    }
  }
}
</script>
