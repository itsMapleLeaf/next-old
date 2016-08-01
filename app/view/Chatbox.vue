<template lang='jade'>
textarea.ui-padding-2(v-model='message', @keydown='submit($event)')
</template>

<script>
export default {
  data () {
    return { message: '' }
  },

  methods: {
    submit (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.$emit('message-sent', this.message)
        this.message = ''
      }
    }
  }
}
</script>
