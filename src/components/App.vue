<template>
  <div class='container bg-color'>
    <chat></chat>
    <component :is='getCurrentOverlay'></component>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelList from './ChannelList.vue'
import {getCurrentOverlay} from '../vuex/getters'

export default {
  components: {
    Chat,
    Login,
    CharacterSelect,
    ChannelList
  },

  vuex: {
    getters: {
      getCurrentOverlay
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/variables'
@import '../styles/components'

.container
  position: fixed 0
</style>
