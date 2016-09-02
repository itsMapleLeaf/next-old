<template lang="pug">
mixin icon-link(icon, action)
  a(href='#', @click!=action)&attributes(attributes)
    i.mdi(class='mdi-' + icon)

mixin info-icon
  transition(name='fade')
    a.ui-padding-subtle(href='#', style='z-index: 3', v-show="!state.overlays.includes('about')", @click="pushOverlay('about')")
      i.mdi.mdi-information.ui-faded

mixin app-info
  span F-Chat Next
  small.ui-faded  v{{ version }}
  +info-icon

.flex-row.flex-justify-space-between.flex-align-center.ui-padding-3
  .flex-fixed
    h1.res.res-desktop
      +app-info
    .res.res-mobile
      +app-info
  .flex-fixed
    a(href='#', @click="notificationIconClicked")
      i.mdi(:class="'mdi-' + bellIcon")
    //- +icon-link('bell', "pushOverlay('notification-log')")
    +icon-link('menu', "pushOverlay('user-menu')").res.res-mobile
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
