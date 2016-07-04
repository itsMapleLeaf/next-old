<template>
  <overlay no-close>
    <h2>Hello, beautiful.</h2>
    <form class='ui form' @submit.prevent='submit'>
      <div class='ui field text-input icon left'>
        <i class='fa fa-user'></i>
        <input type="text" placeholder="Username" v-model="username" :disabled='disabled'>
      </div>
      <div class='ui field text-input icon left'>
        <i class='fa fa-lock'></i>
        <input type="password" placeholder="Password" v-model="password" :disabled='disabled'>
      </div>
      <div class='ui field'>
        <toggle :enabled='remember' @click='remember = !remember'>Remember me</toggle>
      </div>
      <div class='ui field'>
        <button class='ui padded-button' action="submit" :disabled='disabled'>Go</button>
      </div>
      <div class='ui field'>
        <span>{{status}}</span>
      </div>
      <div class='ui field small subtle'>
        <em><a class='ui link' href='#' data-push-overlay='about'>About</a></em>
      </div>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
footer
  width: 100vw
  position: absolute
  bottom: 2em
  padding: 1em
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
      this.disabled = true

      const res = await authenticate(this.username, this.password)

      const loginData: LoginData = {
        account: this.username,
        ticket: res.ticket,
        characters: res.characters,
        bookmarks: res.bookmarks.map(char => char.name),
        friends: res.friends.map(entry => {
          return { you: entry.dest_name, them: entry.source_name }
        })
      }

      this.store.dispatchEvent('LoginSuccess', { loginData, remember: this.remember })

      // sendLoginRequest(this.username, this.password).then(data => {
      //   const loginData = {
      //     account: this.username,
      //     ticket: data.ticket,
      //     characters: data.characters,
      //     bookmarks: data.bookmarks.map(({name}) => name), // ???
      //     friends: data.friends.map(({ source_name, dest_name }) => {
      //       return { source: dest_name, dest: source_name } // ????????
      //     })
      //   }
      //   this.$dispatch(LoginSuccess, loginData, this.remember)
      // })
      // .catch(err => {
      //   this.status = err || errorMessage
      // })
      // .then(() => {
      //   this.disabled = false
      //   this.password = ''
      // })
    }
  }
}
</script>
