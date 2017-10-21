<template>
  <main class="wrapper bg-color-darken-2">
    <section class="description bg-color-main scroll-v" style="padding: 0.3rem 0.6rem">
      <span v-html="parseBBC(channel.description)"></span>
    </section>
    <section class="messages flex-grow bg-color-darken-1 scroll-v" v-auto-scroll>
      <message v-for="(message, i) in channel.messages" v-bind="message" :key="i"></message>
    </section>
    <user-list class="users bg-color-main scroll-v" :users="channel.users" :ops="channel.ops"></user-list>
    <section class="chatbox bg-color-main flex-row" style="padding: 0.3rem;">
      <chatbox class="flex-grow" @submit="sendMessage"></chatbox>
    </section>
  </main>
</template>

<script>
import { parseBBC } from '@/bbc'
import store from '@/store'
import Message from '@/components/chat/Message.vue'
import Chatbox from '@/components/chat/Chatbox.vue'
import UserList from './ChannelUserList.vue'
import { Channel } from '@/store/chat/models'

export default {
  components: {
    UserList,
    Message,
    Chatbox,
  },

  props: {
    channel: Channel,
  },

  methods: {
    parseBBC,
    sendMessage(message) {
      store.chat.sendChannelMessage(this.channel.id, message)
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 6rem auto 6rem;
  grid-template-columns: auto 12rem;
  grid-template-areas: 'description description' 'messages users'
    'chatbox chatbox';
  grid-gap: 4px;
}

.description {
  grid-area: description;
}

.messages {
  grid-area: messages;
}

.users {
  grid-area: users;
}

.chatbox {
  grid-area: chatbox;
}
</style>
