<template lang="pug">
mixin icon-link(icon, action)
  a(href='#', style="font-size: 1.25em; line-height: 1", @click!=action)
    i.mdi(class='mdi-' + icon)

.flex-row.flex-justify-space-between.flex-align-center.flex-wrap.ui-padding-3
  h1.flex-fixed.res.res-desktop F-Chat Next
    small.ui-faded  v{{ version }}
  span.flex-fixed.res.res-mobile F-Chat Next
    small.ui-faded  v{{ version }}
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
