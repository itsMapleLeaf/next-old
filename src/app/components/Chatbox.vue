<template>
  <textarea class='textarea' v-model='message' @keydown.enter.prevent='submit'></textarea>
</template>

<script>
export default {
  data () {
    return { message: '' }
  },
  mounted () {
    window.addEventListener('keydown', this.keydown)
  },
  destroyed () {
    window.addEventListener('keydown', this.keydown)
  },
  methods: {
    keydown () {
      // this.$el.focus()
    },
    submit () {
      this.$emit('submit', this.message)
      this.message = ''
    }
  }
}
</script>
