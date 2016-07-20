<template>
  <overlay no-close>
    <form @submit.prevent='submit' :disabled='disabled'>
      <h2>Hello, beautiful.</h2>
      <div class='ui-field ui-input-icon'>
        <i class='ui-icon mdi mdi-account-circle'></i>
        <input class='ui-input' type="text" placeholder="Username" v-model="username">
      </div>
      <div class='ui-field ui-input-icon'>
        <i class='ui-icon mdi mdi-key-variant'></i>
        <input class='ui-input' type="password" placeholder="Password" v-model="password">
      </div>
      <div class='ui-field'>
        <toggle :value='remember' @click='remember = !remember'>Remember me</toggle>
      </div>
      <div class='ui-field'>
        <button class='ui-button' class='ui padded-button' action="submit" >Go</button>
      </div>
    </form>
    <a class='ui-text about-link' href='#' data-push-overlay='about'>
      <i class='mdi mdi-question-circle'></i>
    </a>
  </overlay>
</template>

<style lang="stylus" scoped>
form
  text-align: center

input
  width: 10rem

.about-link
  opacity: 0.3
  position: absolute
  right: 0.5em
  bottom: 0.5em
</style>

<script>
import DevInfo from './DevInfo.vue'
import Overlay from './Overlay.vue'
import Toggle from './Toggle.vue'

import {authenticate} from '../modules/flist'
import {initStorage, saveStorageKeys, clearStorage, getStorage} from '../modules/storage'
import {pushOverlay, popOverlay, setUserData, setLoadingMessage} from '../modules/vuex/actions'

const connectionError = `
Couldn't connect to the F-List website.
They're either doing maintenance,
or someone spilled coke on the servers again.
`

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
      disabled: false,
      remember: false
    }
  },

  ready () {
    const data = getStorage()
    if (data) {
      this.username = data.account
      this.remember = true
    }
  },

  methods: {
    submit (store) {
      this.status = ''
      this.disabled = true
      this.setLoadingMessage('Logging in...')

      authenticate(this.username, this.password)
      .then(res => {
        if (res.error) {
          throw res.error
        } else {
          const friends = res.friends.map(entry => {
            return { you: entry.dest_name, them: entry.source_name }
          })
          const bookmarks = res.bookmarks.map(char => char.name)
          this.setUserData(this.username, res.ticket, res.characters, friends, bookmarks)

          if (this.remember) {
            initStorage()
            saveStorageKeys({
              account: this.username,
              ticket: res.ticket
            })
          } else {
            clearStorage()
          }
        }

        this.popOverlay()
        this.pushOverlay('character-select-overlay')
        this.username = this.password = ''
      })
      .catch(error => {
        this.addNotice('Login error: ' + (error || connectionError))
      })
      .then(() => {
        this.disabled = false
        this.setLoadingMessage('')
      })
    }
  },

  vuex: {
    actions: {
      pushOverlay,
      popOverlay,
      setUserData,
      setLoadingMessage,

      addNotice ({dispatch}, text) {
        dispatch('SetNewNotice', text)
      }
    }
  }
}
</script>
