<template>
  <textarea class='textarea' v-model='message' @keydown.enter.prevent='submit'></textarea>
</template>

<script>
export default {
  data () {
    return { message: '' }
  },
  methods: {
    submit () {
      this.$emit('submit', this.message)
      this.message = ''
    }
  }
}
</script>
