<template>
  <textarea class='color-main ui-text'
    v-model='message'
    :placeholder='placeholder'
    @keydown='keydown($event)'></textarea>
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
    return { message: '' }
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
    keydown (event) {
      if (event.key === 'Enter') {
        if (!event.ctrlKey) {
          event.preventDefault()
          this.$emit('submit', this.message)
          this.message = ''
        } else {
          this.message += '\n'
        }
      }
    }
  }
}
</script>
