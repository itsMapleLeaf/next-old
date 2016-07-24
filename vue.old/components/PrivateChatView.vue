<template>
  <div class='flex-column flex-stretch'>
    <header class='flex-fixed ui-color-main'>
      <character :character='partner'></character>
      <em>
        <span>- {{partner.status}}</span>
        <span
          v-if="partner.statusMessage"
          v-html='", " + partner.statusMessage | bbcode'>
        </span>
      </em>
    </header>

    <div class='flex-divider'></div>

    <chat-message-list class='flex-stretch' :messages='messages'>
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
import {bbcode} from '../modules/filters'

export default {
  components: {Chatbox, Character, ChatMessage, ChatMessageList},

  props: {
    state: PrivateChatState
  },

  computed: {
    partner () { return this.state.partner },
    messages () { return this.state.messages }
  },

  methods: {
    chatboxSubmit (message) {
      socket.sendPrivateMessage(this.partner.name, message)
      this.addPrivateMessage(this.partner.name, this.userCharacter, message)
    }
  },

  vuex: {
    getters: {
      onlineCharacters: state => state.chat.characters,
      userCharacter: state => state.user.character
    },
    actions: {
      addPrivateMessage ({dispatch}, partner, sender, message) {
        dispatch('AddPrivateChatMessage', partner, sender, message)
      }
    }
  },

  filters: {bbcode}
}
</script>
