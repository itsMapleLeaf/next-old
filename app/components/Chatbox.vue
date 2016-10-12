<!-- TODO: fix this -->

<template>
  <div class='chatbox flex-row'>
    <div class='flex-fixed'>
      <Avatar :name='identity' size='4em' shadow></Avatar>
    </div>
    <BBCEditor class='editor flex-grow' v-model='message' @keydown.enter='submit($event)' :placeholder='placeholder'>
    </BBCEditor>
  </div>
</template>

<style lang='stylus' scoped>
.chatbox
  align-items: center
  padding: 0.5em

.editor
  height: 100%
  margin-left: 0.5em
</style>

<script>
import BBCEditor from './BBCEditor.vue'
import Avatar from './Avatar.vue'
import ProfileLink from './ProfileLink.vue'
import {doBBCShortcut} from '../lib/bbc'

export default {
  components: {
    BBCEditor,
    Avatar,
    ProfileLink,
  },
  props: {
    identity: String,
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
  computed: {
    placeholder() {
      return `Chatting as ${this.identity}...`
    }
  }
}
</script>
