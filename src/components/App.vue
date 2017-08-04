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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Login from './Login.vue'
import CharacterList from './CharacterList.vue'
import Chat from './Chat.vue'
import Loading from './Loading.vue'
import { state } from '../store'

@Component({
  components: { Loading }
})
export default class App extends Vue {
  get appState() {
    return state.appState
  }

  get currentView() {
    const views = {
      'login': Login,
      'character-select': CharacterList,
      'online': Chat,
    }
    return views[this.appState]
  }

  get loadingMessage() {
    const messages = {
      'setup': 'Setting things up...',
      'logging-in': 'Logging in...',
      'connecting': 'Connecting...',
      'identifying': 'Identifying...',
    }
    return messages[this.appState]
  }
}
</script>
