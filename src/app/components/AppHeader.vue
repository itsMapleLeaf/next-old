<template lang="pug">
mixin icon-link(icon, action)
  a(href='#', style="font-size: 1.25em; line-height: 1", @click!=action)
    i.mdi(class='mdi-' + icon)
mixin info-icon
  transition(name='fade')
    a.ui-padding-subtle(href='#', style='z-index: 3', v-show="!state.overlays.includes('about')", @click="pushOverlay('about')")
      i.mdi.mdi-information.ui-faded

.flex-row.flex-justify-space-between.flex-align-center.flex-wrap.ui-padding-3
  .flex-row
    h1.flex-fixed.res.res-desktop F-Chat Next
      small.ui-faded  v{{ version }}
        +info-icon
    span.flex-fixed.res.res-mobile F-Chat Next
      small.ui-faded  v{{ version }}
      +info-icon
  .flex-row.flex-align-center
    +icon-link('menu', "pushOverlay('user-menu')")
</template>

<script>
import {getAvatarURL} from '../f-list'
import {state, pushOverlay} from '../store'
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
    pushOverlay
  }
}
</script>
