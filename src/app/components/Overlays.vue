<template lang="pug">
span
  transition(v-for='(overlay, index) in overlays', :key='index', name='overlay', appear)
    component(:is='overlay')
</template>

<script>
import UserMenu from './UserMenu.vue'
import CharacterMenu from './CharacterMenu.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelSelect from './ChannelSelect.vue'
import RoomInfo from './RoomInfo.vue'
import CharacterBrowser from './CharacterBrowser.vue'
import About from './About.vue'

export default {
  components: {
    UserMenu,
    CharacterMenu,
    Login,
    CharacterSelect,
    ChannelSelect,
    RoomInfo,
    CharacterBrowser,
    About
  },
  props: {
    overlays: Array
  }
}
</script>
