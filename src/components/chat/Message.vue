<template>
  <div style="padding: 0.4rem 0.6rem" :class="['flex-row', 'message-type-' + type, isAction && 'message-action']">
    <div>
      <a :href="getProfileURL(sender)" target="_blank">
        <img class="avatar" :src="getAvatarURL(sender)" :key="sender" />
      </a>
    </div>
    <div style="margin-left: 0.6rem" class="flex-grow">
      <span style="margin-right: 0.2rem">
        <character-name v-bind="getCharacter(sender)"></character-name>
        <span class="time" style="margin-left: 0.5rem">{{ parsedDate }}</span>
      </span>
      <span v-html="parseBBC(parsedText)" style="white-space: pre-wrap; word-break: break-word"></span>
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
.avatar {
  width: 2.5em;
  height: 2.5em;
}

.message-type-lfrp {
  background-color: rgba(46, 204, 113, 0.1);
}

.padded-section {
  padding: 0.3rem;
  margin-top: -0.2rem;
}

.message-action {
  font-style: italic;
}

.time {
  opacity: 0.3;
  float: right;
  font-size: 75%;
}
</style>
