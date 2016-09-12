<template lang='pug'>
.container
  transition(name='fade', mode='out-in', appear)
    component(:is='currentView', @login-submit='loginSubmit')
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

export default {
  components: {
    Login,
    CharacterList
  },
  data () {
    return {
      currentView: Login
    }
  },
  methods: {
    loginSubmit () {
      this.currentView = CharacterList
    }
  }
}
</script>
