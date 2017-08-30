<template>
  <main class="flex-column">
    <section class="scroll-v" style="height: 5rem; padding: 0.3rem 0.6rem">
      <span v-html="parseBBC(description)"></span>
    </section>
    <div class="flex-grow flex-row">
      <section class="flex-grow bg-color-darken-1 scroll-v" v-auto-scroll>
        <message v-for="(message, i) in messages" v-bind="message" :key="i"></message>
      </section>
      <user-list class="scroll-v" style="width: 12rem" :users="users" :ops="ops"></user-list>
    </div>
    <section class="bg-color-main flex-row" style="height: 5rem; padding: 0.3rem;">
      <chatbox class="flex-grow" @submit="sendMessage"></chatbox>
    </section>
  </main>
</template>

<script>
import { parseBBC } from '../../bbc'

export default {
  components: {
    CharacterName: require('./CharacterName.vue'),
    UserList: require('./UserList.vue'),
    Message: require('./Message.vue'),
    Chatbox: require('./Chatbox.vue'),
  },
  props: {
    id: String,
    title: String,
    description: String,
    users: Array,
    messages: Array,
    ops: Array,
  },
  methods: {
    parseBBC,
    sendMessage(message) {
      this.$store.dispatch('sendChannelMessage', { id: this.id, message })
    },
  },
}
</script>
