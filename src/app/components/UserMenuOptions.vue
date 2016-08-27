<template lang="pug">
mixin option(icon, action)
  a.ui-padding-3(href='#', @click!=action)
    i.mdi(class="mdi-" + icon)

.flex-row.flex-justify-space-between
  +option('forum', "pushOverlay('channel-select')")
  +option('heart', "pushOverlay('character-browser')")
  +option('logout', 'logOut')
  +option('account-settings')
  +option('settings')
</template>

<script>
import MenuOption from './MenuOption.vue'
import {pushOverlay, logOut, switchCharacter} from '../store'

export default {
  components: {MenuOption},

  methods: {
    pushOverlay,
    logOut,
    switchCharacter
  }
}
</script>
