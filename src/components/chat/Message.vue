<template>
  <div :class="['message', isAction && 'message-action']">
    <div style="padding: 0.4rem 0.6rem" :class="'message-type-' + type">
      <span class="message-time">{{ parsedDate }}</span>
      <character-name v-bind="getCharacter(sender.name)"></character-name>
      <span class="message-text" v-html="parseBBC(parsedText)"></span>
    </div>
  </div>
</template>

<script>
import { parseBBC } from '@/bbc'
import { getAvatarURL, getProfileURL } from '@/api'
import store from '@/store'

export default {
  props: {
    sender: Object,
    text: String,
    type: String,
    date: Date,
  },
  components: {
    CharacterName: require('./CharacterName.vue').default,
  },
  methods: {
    getAvatarURL,
    getProfileURL,
    parseBBC,
  },
  computed: {
    characters() {
      return store.chat.characters
    },
    getCharacter() {
      return name => store.chat.characters[name]
    },
    isAction() {
      return this.text.startsWith('/me')
    },
    parsedText() {
      if (this.isAction) {
        return this.text.replace(/^\/me\s*/, '')
      }
      return this.text
    },
    parsedDate() {
      return this.date.toLocaleTimeString()
    }
  },
}
</script>

<style lang="scss" scoped>
.message-type-lfrp {
  background-color: rgba(46, 204, 113, 0.1);
}

.message:nth-child(2n) {
  background-color: rgba(black, 0.1);
}

.message-action {
  font-style: italic;
}

.message-text {
  white-space: pre-wrap;
  word-break: break-word;
  margin-left: 0.3rem;
}

.message-time {
  opacity: 0.3;
  float: right;
  font-size: 75%;
}
</style>
