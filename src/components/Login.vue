<template>
  <div class='container'>
    <form class='shadow' @submit.prevent='submitLogin(username, password)'>
      <h1>Login</h1>
      <fieldset>
        <input type="text" placeholder="Username" v-model="username">
      </fieldset>
      <fieldset>
        <input type="password" placeholder="Password" v-model="password">
      </fieldset>
      <fieldset>
        <button action="submit">Go</button>
      </fieldset>
      <fieldset>
        <p>Status Text...</p>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {submitLogin} from '../vuex/actions'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  vuex: {
    actions: {
      submitLogin
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
  box: middle center
  text-align: center
  // background: rgba(0, 0, 0, 0.3)

form
  width: 300px
  background: fg-color
  padding: 30px 30px

p
  text-align: center
</style>
