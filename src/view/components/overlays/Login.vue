<template>
  <overlay no-close>
    <h2>Hello, beautiful.</h2>
    <form class='ui form' @submit.prevent='submit' :disabled='disabled'>
      <div class='ui field text-input icon left'>
        <i class='fa fa-user'></i>
        <input type="text" placeholder="Username" v-model="username">
      </div>
      <div class='ui field text-input icon left'>
        <i class='fa fa-lock'></i>
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class='ui field'>
        <toggle :value='remember' @click='remember = !remember'>Remember me</toggle>
      </div>
      <div class='ui field'>
        <button class='ui padded-button' action="submit" >Go</button>
      </div>
      <div class='ui field'>
        <span>{{status}}</span>
      </div>
      <a class='ui link subtle about-link' href='#' data-push-overlay='about'>
        <i class='fa fa-question-circle'></i>
      </a>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.about-link
  position: absolute
  right: 0.5em
  bottom: 0.5em
</style>

<script>
import DevInfo from 'view/components/elements/DevInfo.vue'
import Overlay from 'view/components/elements/Overlay.vue'
import Toggle from 'view/components/elements/Toggle.vue'

import {LoginData} from 'types/app'
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
      store
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
      this.store.dispatch('LoginRequest')

      try {
        const res = await authenticate(this.username, this.password)

        if (res.error) {
          this.store.dispatch('LoginFailure')
          this.status = res.error
          this.disabled = false
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
          this.store.dispatch('LoginSuccess', { loginData, remember: this.remember })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
