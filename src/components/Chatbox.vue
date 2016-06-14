<template>
  <textarea
    v-model='input'
    :placeholder="calculatePlaceholder()"
    :style="calculateStyle()"></textarea>
</template>

<script>
import {getCharacterName} from '../vuex/getters'

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
      if (this.getCharacterName === '') {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.getCharacterName}...`
      }
    }
  },

  vuex: {
    getters: {
      getCharacterName
    }
  }
}
</script>

<style lang="stylus" scoped>
textarea
  margin: none
  border: none
  background: transparent
  width: 100%
  height: 100%
</style>
