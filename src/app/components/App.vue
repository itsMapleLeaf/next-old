<template>
  <body>
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

<style lang='stylus' scoped>
@require 'layout'
@require 'flex'
@require 'theme'
@require 'fade'

body
  fullscreen()
  flex()
  flex-align(center)
  background: $theme-color
</style>

<style lang='stylus'>
@require 'theme'
@require 'layout'
@require 'link'

*
  margin: 0
  padding: 0
  box-sizing: border-box

:root
  color: $text-color
  font: 14pt Roboto, sans-serif

:focus
  outline: none

a
  color: inherit
  text-decoration: none

h1, h2, h3, h4, h5, h6
  font-family: 'Roboto Condensed'
  font-weight: 300
  opacity: 0.9

h1 { font-size: 2.4em }
h2 { font-size: 1.8em }
h3 { font-size: 1.5em }
h4 { font-size: 1.2em }
h5 { font-size: 1.1em }
h6 { font-size: 0.9em }

input, button, textarea
  font: inherit
  color: inherit
  background: none
  border: none

textarea
  resize: none

fieldset
  border: none
  margin-bottom: 0.8em

ul, ol, li
  list-style: none

::-webkit-scrollbar
  size(10px)
  &-track
    background: darken($theme-color, 40%)
  &-thumb
    background: lighten($theme-color, 10%)

.chat-icon
  size(40px)
  display: inline-block
  background-size: contain
  vertical-align: text-top
</style>
