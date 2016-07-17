<template>
  <div class='flex-column flex-stretch'>
    <header class='flex-fixed ui-color-main'>
      <character :character='state.partner'></character>
      <em>
        <span>- {{state.partner.status}}</span>
        <span
          v-if="state.partner.statusMessage"
          v-html='", " + state.partner.statusMessage | bbcode'>
        </span>
      </em>
    </header>

    <div class='flex-divider'></div>

    <chat-message-list class='flex-stretch' :messages='state.messages'>
    </chat-message-list>

    <div class='flex-divider'></div>

    <div class='flex-fixed ui-color-main'>
      <chatbox @submit='chatboxSubmit'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
header
  padding: 0.5em
</style>

<script>
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'
import ChatMessageList from './ChatMessageList.vue'
import PrivateChatState from '../types/PrivateChatState'
import socket from '../modules/socket'

export default {
  components: {
    Chatbox,
    Character,
    ChatMessage,
    ChatMessageList
  },

  props: {
    state: PrivateChatState
  },

  methods: {
    chatboxSubmit (message) {
      const partner = this.state.partner.name
      socket.sendPrivateMessage(partner, message)
      this.addPrivateMessage(partner, this.character, message)
    }
  },

  vuex: {
    getters: {
      character: state => state.user.character
    },
    actions: {
      addPrivateMessage ({dispatch}, partner, sender, message) {
        dispatch('AddPrivateChatMessage', partner, sender, message)
      }
    }
  }
}
</script>
