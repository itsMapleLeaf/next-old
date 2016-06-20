<template>
  <div
    class='chatbox'
    contenteditable
    :placeholder="placeholder"
    maxlength="4096"
    @input='edited($event)'
    @keydown.enter.prevent='messageSent($event)'>
  </div>
</template>

<script>
import {userCharacterName} from '../vuex/getters'
import {sendChannelMessage} from '../vuex/actions'

export default {
  data () {
    return {
      input: ''
    }
  },

  computed: {
    placeholder () {
      if (this.userCharacterName === '') {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.userCharacterName}...`
      }
    }
  },

  methods: {
    edited (event) {
      this.input = event.target.innerText.trim()
    },

    messageSent (event) {
      this.sendChannelMessage(this.input)
      this.input = ''
      event.target.innerText = ''
    }
  },

  vuex: {
    getters: {
      userCharacterName
    },
    actions: {
      sendChannelMessage
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables'

.chatbox
  min-height: 5em
  margin: 0em
  border: none !important
  background-color: fg-color !important

  &:focus
    background-color: lighten(fg-color, 5%) !important
</style>
