<template >
  <form @submit.prevent='submit' :disabled='disabled'>
    <div class='ui-field'>
      <dropdown :value='status' @input='setStatus'>
        <a href='#' value='online'>Online</a>
        <a href='#' value='looking'>Looking</a>
        <a href='#' value='busy'>Busy</a>
        <a href='#' value='away'>Away</a>
        <a href='#' value='dnd'>DND</a>
      </dropdown>
    </div>
    <div class='ui-field'>
      <textarea class='ui-input' placeholder="What's up?" v-model='statusMessage'></textarea>
    </div>
    <div class='ui-field'>
      <button class='ui-button' style='font-size: 0.8em; padding: 0.3em 0.8em' action='submit' :disabled='disabled'>
        Update
      </button>
    </div>
  </form>
</template>

<style lang="stylus" scoped>
.ui-field
  margin-bottom: 0.8rem

textarea
  height: 4em
</style>

<script>
import Dropdown from './Dropdown.vue'
import socket from '../modules/socket'

export default {
  components: {Dropdown},

  data () {
    return {
      status: 'online',
      statusMessage: '',
      disabled: false
    }
  },

  vuex: {
    getters: {
      initStatus: state => state.user.status,
      initStatusMessage: state => state.user.statusMessage
    },
    actions: {
      setUserStatus ({dispatch}, status, message) {
        dispatch('SetUserStatus', status, message)
      }
    }
  },

  ready () {
    this.status = this.initStatus
    this.statusMessage = this.initStatusMessage
  },

  methods: {
    setStatus (status) {
      this.status = status
    },
    submit () {
      if (this.disabled) return
      socket.setStatus(this.status, this.statusMessage)
      this.setUserStatus(this.status, this.statusMessage)
      this.disabled = true
      window.setTimeout(() => { this.disabled = false }, 1500)
    }
  }
}
</script>
