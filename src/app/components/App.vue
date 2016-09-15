<template>
  <body class='container'>
    <transition name='fade' mode='out-in' appear>
      <component v-if='currentView'
        :is='currentView'
        :characters='userCharacters'
        @login-submit='loginSubmit'
        @login-success='loginSuccess'
        @login-failure='loginFailure'
        @character-list-submit='characterListSubmit'>
      </component>
    </transition>
    <transition name='fade' appear>
      <loading v-if='loadingMessage'>{{ loadingMessage }}</loading>
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

export default {
  components: {
    Loading
  },
  data () {
    return {
      currentView: null,
      loadingMessage: '',
      userCharacters: []
    }
  },
  mounted () {
    storage.getItem('auth').then(auth => {
      if (!auth) {
        return Promise.reject()
      } else {
        this.loadingMessage = 'Setting things up...'
        return flist.getCharacters(auth.account, auth.ticket).then(characters => {
          this.userCharacters = characters
          this.currentView = CharacterList
          this.loadingMessage = ''
        })
      }
    }).catch(() => {
      this.loadingMessage = ''
      this.currentView = Login
    })
  },
  methods: {
    loginSubmit () {
      this.loadingMessage = 'Logging in...'
    },
    loginSuccess () {
      this.loadingMessage = ''
      this.currentView = CharacterList
    },
    loginFailure () {
      this.loadingMessage = ''
    },
    characterListSubmit (character) {
      this.currentView = Chat
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
