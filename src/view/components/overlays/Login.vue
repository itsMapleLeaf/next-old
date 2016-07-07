<template>
  <overlay no-close>
    <form @submit.prevent='submit' :disabled='disabled'>
      <h2>Hello, beautiful.</h2>
      <fieldset class='ui-icon-left'>
        <i class='fa fa-user fa-fw'></i>
        <input type="text" placeholder="Username" v-model="username">
      </fieldset>
      <fieldset class='ui-icon-left'>
        <i class='fa fa-lock fa-fw'></i>
        <input type="password" placeholder="Password" v-model="password">
      </fieldset>
      <fieldset>
        <toggle :value='remember' @click='remember = !remember'>Remember me</toggle>
      </fieldset>
      <fieldset>
        <button class='ui padded-button' action="submit" >Go</button>
      </fieldset>
      <fieldset>
        <span>{{status}}</span>
      </fieldset>
      <a class='ui-subtle about-link' href='#' data-push-overlay='about'>
        <i class='fa fa-question-circle'></i>
      </a>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
form {
  padding: 0em 1.2em
}

.about-link {
  position: absolute
  right: 0.5em
  bottom: 0.5em
}
</style>

<script>
import DevInfo from '../elements/DevInfo.vue'
import Overlay from '../elements/Overlay.vue'
import Toggle from '../elements/Toggle.vue'

import {LoginData} from 'modules/types'
import {authenticate} from 'modules/flist'
import {store} from 'modules/store'

// const errorMessage = `
// Could not connect to F-List website.
// They're either doing maintenance,
// or someone spilled coke on the servers again.
// `

export default {
  components: {
    DevInfo,
    Overlay,
    Toggle
  },

  data () {
    return {
      username: '',
      password: '',
      status: '',
      disabled: false,
      remember: false,
      state: store.state
    }
  },

  ready () {
    // storage.getAccount().then(account => {
    //   this.username = account
    //   this.remember = true
    // })
    // .catch(() => {
    //   this.remember = false
    // })
  },

  methods: {
    async submit () {
      this.status = ''
      this.disabled = true
      store.notify('LoginRequest')

      try {
        const res = await authenticate(this.username, this.password)

        if (res.error) {
          this.status = res.error
          this.disabled = false
          store.notify('LoginFailure')
        } else {
          const loginData: LoginData = {
            account: this.username,
            ticket: res.ticket,
            characters: res.characters,
            bookmarks: res.bookmarks.map(char => char.name),
            friends: res.friends.map(entry => {
              return { you: entry.dest_name, them: entry.source_name }
            })
          }
          store.notify('LoginSuccess', { loginData, remember: this.remember })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
