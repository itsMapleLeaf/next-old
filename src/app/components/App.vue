<template>
  <body class='container'>
    <transition name='fade' mode='out-in' appear>
      <component v-if='currentView' :is='currentView' />
    </transition>
    <transition name='fade' appear>
      <Loading v-if='loadingMessage'>{{ loadingMessage }}</Loading>
    </transition>
  </body>
</template>

<script>
import Login from './Login.vue'
import CharacterList from './CharacterList.vue'
import Chat from './Chat.vue'
import Loading from './Loading.vue'

import * as flist from '../lib/f-list'
import * as storage from 'localforage'
import {store, getters} from '../store'

export default {
  components: {
    Login,
    CharacterList,
    Chat,
    Loading
  },
  created () {
    store.init()
  },
  computed: getters(['currentView', 'loadingMessage'])
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

.container
  fullscreen()
  flex()
  flex-align(center)
  background: $theme-color
</style>
