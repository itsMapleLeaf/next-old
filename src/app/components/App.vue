<template>  
  <body class='container'>
    <transition name='fade' mode='out-in' appear='appear'>
      <component :is='currentView' @login-submit='loginSubmit' @character-list-submit='characterListSubmit'></component>
    </transition>
  </body>
</template>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

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

export default {
  data () {
    return {
      currentView: Chat
    }
  },
  methods: {
    loginSubmit (account, password, remember) {
      this.currentView = CharacterList
    },
    characterListSubmit (character) {
      this.currentView = Chat
    }
  }
}
</script>
