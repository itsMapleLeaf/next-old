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
        <p>{{ getLoginStatus }}</p>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {submitLogin} from '../vuex/actions'
import {getLoginStatus} from '../vuex/getters'

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
    },
    getters: {
      getLoginStatus
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/variables'
@import '../styles/mixins'

.container
  position: fixed 0
  box: middle center
  text-align: center
  background: rgba(0, 0, 0, 0.3)

form
  width: 300px
  background: fg-color
  padding: 30px 30px
  shadow()

p
  text-align: center
</style>
