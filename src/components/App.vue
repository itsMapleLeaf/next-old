<template>
  <main class='container'>
    <transition name='fade' mode='out-in' appear>
      <component v-if='currentView' :is='currentView'></component>
    </transition>
    <transition name='fade' appear>
      <Loading v-if='loadingMessage'>{{ loadingMessage }}</Loading>
    </transition>
  </main>
</template>

<style lang='stylus' scoped>
@require 'vars'

.container
  fullscreen()
  flex()
  flex-align(center)
  background: $theme-color
</style>

<script>
import Login from './Login.vue'
import CharacterList from './CharacterList.vue'
import Chat from './Chat.vue'
import Loading from './Loading.vue'

import { getters } from '../store'

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
