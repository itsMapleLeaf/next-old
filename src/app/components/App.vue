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

<style lang='stylus' scoped>
@require 'layout'
@require 'flex'
@require 'theme'
@require 'fade'

.container
  fullscreen()
  flex()
  flex-align(center)
  background: $theme-color
</style>

<style lang='stylus'>
@require 'global'
</style>

<script>
import Login from './Login.vue'
import CharacterList from './CharacterList.vue'
import Chat from './Chat.vue'
import Loading from './Loading.vue'

import {getters} from '../store'

export default {
  components: {
    Loading,
  },
  computed: {
    ...getters(['appState']),

    currentView() {
      const views = {
        'login': Login,
        'character-select': CharacterList,
        'online': Chat,
      }
      return views[this.appState]
    },
    loadingMessage() {
      const messages = {
        'setup': 'Setting things up...',
        'logging-in': 'Logging in...',
        'connecting': 'Connecting...',
        'identifying': 'Identifying...',
      }
      return messages[this.appState]
    },
  },
}
</script>
