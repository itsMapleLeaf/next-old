<template>
  <div class='chatbox' contenteditable :placeholder="placeholder" :style="style" @input='edited($event)'></div>
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
    style () {
      return {
        fontStyle: this.input.length === 0 ? 'italic' : 'inherit'
      }
    },

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
.chatbox
  size: 100% !important
  background: none
  border: none !important
</style>
