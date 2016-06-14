<template>
  <div class='overlay-shade'>
    <form class='panel material-shadow' @submit.prevent='submitLogin(username, password)'>
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
@import '../styles/components'

p
  text-align: center
</style>
