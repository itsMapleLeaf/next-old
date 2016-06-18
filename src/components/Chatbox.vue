<template>
  <div class='chatbox' contenteditable :placeholder="placeholder" @input='edited($event)'></div>
</template>

<script>
import {userCharacterName} from '../vuex/getters'

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
    }
  },

  vuex: {
    getters: {
      userCharacterName
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables'

.chatbox
  min-height: 5em
  margin: 0em
  border: none
  background-color: fg-color !important
</style>
