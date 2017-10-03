<template>
  <main class="flex-column">
    <section class="scroll-v" style="height: 5rem; padding: 0.3rem 0.6rem">
      <character-status v-bind="character"></character-status>
    </section>
    <section class="flex-grow bg-color-darken-1 scroll-v" v-auto-scroll>
      <message v-for="(message, i) in messages" v-bind="message" :key="i"></message>
    </section>
    <section class="bg-color-main flex-row" style="height: 5rem; padding: 0.3rem;">
      <chatbox class="flex-grow" @submit="sendMessage"></chatbox>
    </section>
  </main>
</template>

<script>
import { parseBBC } from '@/chat/bbc'

export default {
  components: {
    CharacterStatus: require('./CharacterStatus.vue').default,
    Message: require('./Message.vue').default,
    Chatbox: require('./Chatbox.vue').default,
  },
  props: {
    partner: String,
    messages: Array,
  },
  methods: {
    parseBBC,
    sendMessage(message) {
      this.$store.dispatch('sendPrivateMessage', { recipient: this.partner, message })
    },
  },
  computed: {
    character() {
      return this.$store.getters.getCharacter(this.partner)
    }
  }
}
</script>
