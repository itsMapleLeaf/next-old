<template>
  <div class='flex-column flex-stretch'>
    <header class='flex-fixed ui-color-main'>
      <character :character='partnerCharacter'></character>
      <em>
        <span>- {{partnerCharacter.status}}</span>
        <span
          v-if="partnerCharacter.statusMessage"
          v-html='", " + partnerCharacter.statusMessage | bbcode'>
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
import CharacterType from '../types/Character'
import socket from '../modules/socket'

export default {
  components: {
    Chatbox,
    Character,
    ChatMessage,
    ChatMessageList
  },

  props: {
    partner: CharacterType,
    messages: Array
  },

  methods: {
    chatboxSubmit (message) {
      socket.sendPrivateMessage(this.partner, message)
      this.addPrivateMessage(this.partner, this.userCharacter, message)
    }
  },

  computed: {
    partnerCharacter () {
      return this.onlineCharacters[this.partner]
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
  }
}
</script>
