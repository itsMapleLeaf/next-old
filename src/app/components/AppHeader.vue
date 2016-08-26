<template lang="pug">
mixin icon-link(icon)
  a.ui-margin-right-1(href='#', style="font-size: 1.25em; line-height: 1")
    i.mdi(class='mdi-' + icon)

.flex-row.flex-justify-space-between.flex-align-center.flex-wrap.ui-padding-2
  h1.flex-fixed F-Chat Next
    small.ui-faded  v{{ version }}
  .flex-row.flex-align-center
    +icon-link('bell-outline')
    +icon-link('settings')
    a(href='#', @click="pushOverlay('user-menu')")
      img.ui-block(:src="getAvatarURL(state.identity)", width='30', height='30', style="border-radius: 50%")
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
