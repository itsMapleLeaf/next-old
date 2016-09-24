<template>
  <BBCEditor v-model='message' @keydown.enter.prevent='submit' :placeholder='placeholder'>
  </BBCEditor>
</template>

<script>
import BBCEditor from './BBCEditor.vue'
import {doBBCShortcut} from '../lib/bbc'

export default {
  components: {
    BBCEditor,
  },
  props: {
    placeholder: String,
  },
  data() {
    return { message: '' }
  },
  methods: {
    submit() {
      this.$emit('submit', this.message)
      this.message = ''
    },
    shortcut(event) {
      this.message = doBBCShortcut(this.message, event)
    },
  },
}
</script>
