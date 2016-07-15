<template>
  <overlay no-close>
    <form @submit.prevent='submit' :disabled='disabled'>
      <h2>Hello, beautiful.</h2>
      <div class='ui-field ui-input-icon'>
        <i class='ui-icon fa fa-user fa-fw'></i>
        <input class='ui-input' type="text" placeholder="Username" v-model="username">
      </div>
      <div class='ui-field ui-input-icon'>
        <i class='ui-icon fa fa-lock fa-fw'></i>
        <input class='ui-input' type="password" placeholder="Password" v-model="password">
      </div>
      <div class='ui-field'>
        <toggle :value='remember' @click='remember = !remember'>Remember me</toggle>
      </div>
      <div class='ui-field'>
        <button class='ui-button' class='ui padded-button' action="submit" >Go</button>
      </div>
      <div class='ui-field'>
        <span>{{status}}</span>
      </div>
    </form>
    <a class='ui-text about-link' href='#' data-push-overlay='about'>
      <i class='fa fa-question-circle'></i>
    </a>
  </overlay>
</template>

<style lang="stylus" scoped>
form
  text-align: center

.about-link
  opacity: 0.5
  position: absolute
  right: 0.5em
  bottom: 0.5em
</style>

<script>
import DevInfo from '../elements/DevInfo.vue'
import Overlay from '../elements/Overlay.vue'
import Toggle from '../elements/Toggle.vue'

import {authenticate} from 'modules/flist'
import {pushOverlay, popOverlay} from '../../vuex/actions'

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
      remember: false
    }
  },

  methods: {
    submit (store) {
      this.status = ''
      this.disabled = true
      this.pushOverlay('loading')

      authenticate(this.username, this.password)
      .then(res => {
        if (res.error) {
          throw res.error
        } else {
          const friends = res.friends.map(entry => {
            return { you: entry.dest_name, them: entry.source_name }
          })
          const bookmarks = res.bookmarks.map(char => char.name)
          this.setLoginData(this.username, res.ticket, res.characters, friends, bookmarks)
        }
      })
      .catch(error => {
        this.status = error
      })
      .then(() => {
        this.popOverlay()
        this.username = this.password = ''
        this.disabled = false
      })
    }
  },

  vuex: {
    actions: {
      pushOverlay,
      popOverlay,

      setLoginData: (store, account, ticket, characters, friends, bookmarks) => {
        store.dispatch('SetAuth', account, ticket)
        store.dispatch('SetUserCharacterList', characters)
        store.dispatch('SetFriendsList', friends)
        store.dispatch('SetBookmarkList', bookmarks)
      }
    }
  }
}
</script>
