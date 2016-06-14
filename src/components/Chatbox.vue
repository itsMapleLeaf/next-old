<template>
  <textarea
    v-model='input'
    :placeholder="calculatePlaceholder()"
    :style="calculateStyle()"></textarea>
</template>

<script>
import {userCharacterName} from '../vuex/getters'

export default {
  data () {
    return {
      input: ''
    }
  },

  methods: {
    calculateStyle () {
      return {
        fontStyle: this.input.length === 0 ? 'italic' : 'inherit'
      }
    },

    calculatePlaceholder () {
      if (this.userCharacterName === '') {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.userCharacterName}...`
      }
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

textarea
  margin: none !important
  border: none !important
  background: transparent !important
  resize: none
  width: 100%
  height: 100%
</style>
