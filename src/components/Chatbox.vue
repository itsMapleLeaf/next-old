<template>
  <textarea
    placeholder="Chatting as {{getCharacterName}}..."
    v-model='input'
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
