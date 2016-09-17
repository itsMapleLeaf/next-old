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
    Loading
  },
  computed: {
    ...getters(['appState']),

    currentView () {
      switch (this.appState) {
        case 'login':
          return Login
        case 'character-select':
          return CharacterList
        case 'online':
          return Chat
      }
    },
    loadingMessage () {
      switch (this.appState) {
        case 'setup':
          return 'Setting things up...'
        case 'logging-in':
          return 'Logging in...'
        case 'connecting':
          return 'Connecting...'
        case 'identifying':
          return 'Identifying...'
        default:
          return ''
      }
    }
  }
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
