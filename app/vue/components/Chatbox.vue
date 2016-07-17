<template>
  <textarea class='ui-color-main ui-text' :placeholder='placeholder' v-model='input'></textarea>
</template>

<style scoped>
textarea {
  display: block;
  width: 100%;
  height: 4rem;
  padding: 0.4em 0.6em;
  font-size: 0.9em;
  border: none;
  resize: none;
}
</style>

<script>
export default {
  data () {
    return { input: '' }
  },

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
  }
}
</script>
