<template>
  <div
    class='ui-color-main ui-text ui-scroll ui-editor'
    v-editor.partial :placeholder='placeholder'
    @blur='fixContent($event)'></div>
</template>

<style scoped>
div {
  width: 100%;
  min-height: 4rem;
  max-height: 10rem;
  padding: 0.4em 0.6em;
  border: none;
  resize: none;
  display: block;
  font-size: 0.9em;
}
</style>

<script>
import {editor} from '../modules/directives'

export default {
  props: {},

  vuex: {
    getters: {
      character: state => state.user.character
    }
  },

  computed: {
    placeholder () {
      if (!this.character) {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.character}...`
      }
    }
  },

  methods: {
    fixContent (event) {
      event.target.innerHTML = event.target.textContent.trim()
    }
  },

  directives: {editor}
}
</script>
