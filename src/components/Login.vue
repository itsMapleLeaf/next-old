<template>
  <div class='overlay-shade'>
    <div class='panel material-shadow'>
      <h1>Login</h1>
      <form @submit.prevent='submit'>
        <fieldset>
          <input type="text" placeholder="Username" v-model="username"  :disabled='disabled'>
        </fieldset>
        <fieldset>
          <input type="password" placeholder="Password" v-model="password"  :disabled='disabled'>
        </fieldset>
        <fieldset>
          <button action="submit" :disabled='disabled'>Go</button>
        </fieldset>
      </form>
      <center>{{ loginStatus }}</center>
    </div>
  </div>
</template>

<script>
import {submitLogin, setCurrentOverlay} from '../vuex/actions'
import {loginStatus} from '../vuex/getters'

export default {
  data () {
    return {
      username: '',
      password: '',
      disabled: false,
    }
  },

  methods: {
    submit () {
      this.submitLogin(this.username, this.password)
      .then(() => {
        this.setCurrentOverlay('character-select')
        this.username = this.password = ''
      })
      .catch(() => this.disabled = false)

      this.disabled = true
    }
  },

  vuex: {
    actions: {
      submitLogin,
      setCurrentOverlay
    },
    getters: {
      loginStatus
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/components'
</style>
