<template>
  <overlay :close-on-shade-clicked='false'>
    <h1>Hi there!</h1>
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
        <button class='ui button' action="submit" :disabled='disabled'>Go</button>
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
import DevInfo from '../elements/DevInfo.vue'
import Overlay from '../elements/Overlay.vue'
import Toggle from '../elements/Toggle.vue'

import {sendLoginRequest} from '../../lib/flist'
import {LoginSuccess} from '../../lib/events'

const errorMessage = `
Could not connect to F-List website.
They're either doing maintenance,
or someone spilled coke on the servers again.
`

export default {
  data () {
    return {
      username: '',
      password: '',
      status: '',
      disabled: false,
      remember: false
    }
  },

  components: {
    DevInfo,
    Overlay,
    Toggle
  },

  methods: {
    submit () {
      this.disabled = true

      sendLoginRequest(this.username, this.password).then(data => {
        const loginData = {
          account: this.username,
          ticket: data.ticket,
          characters: data.characters,
          bookmarks: data.bookmarks.map(({name}) => name), // ???
          friends: data.friends.map(({ source_name, dest_name }) => {
            return { source: dest_name, dest: source_name } // ????????
          })
        }
        this.$dispatch(LoginSuccess, loginData)
      })
      .catch(err => {
        this.status = err || errorMessage
      })
      .then(() => {
        this.disabled = false
        this.password = ''
      })
    }
  }
}
</script>
