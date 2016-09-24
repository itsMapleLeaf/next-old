<template>
  <BBCEditor v-model='message' @keydown.enter='submit($event)' :placeholder='placeholder'>
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
    submit(event) {
      if (!event.ctrlKey && !event.shiftKey) {
        this.$emit('submit', this.message)
        this.message = ''
        event.preventDefault()
      }
    },
    shortcut(event) {
      this.message = doBBCShortcut(this.message, event)
    },
  },
}
</script>
