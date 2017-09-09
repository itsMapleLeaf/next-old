<template>
  <div :class="['message', isAction && 'message-action']">
    <div style="padding: 0.4rem 0.6rem" :class="'message-type-' + type">
      <span class="message-time">{{ parsedDate }}</span>
      <character-name v-bind="getCharacter(sender)"></character-name>
      <span class="message-text" v-html="parseBBC(parsedText)"></span>
    </div>
  </div>
</template>

<script>
import { getAvatarURL, getProfileURL } from '../../api'
import { parseBBC } from '../../bbc'

export default {
  props: {
    sender: String,
    text: String,
    type: String,
    date: Date,
  },
  components: {
    CharacterName: require('./CharacterName.vue'),
  },
  methods: {
    getAvatarURL,
    getProfileURL,
    parseBBC,
  },
  computed: {
    characters() {
      return this.$store.state.chat.characters
    },
    getCharacter() {
      return this.$store.getters.getCharacter
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
