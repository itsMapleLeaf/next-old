<template>
  <div class='flex-column flex-stretch'>
    <div class='flex-row flex-fixed channel-head'>
      <div class='flex-divider'></div>

      <!-- description -->
      <div class='flex-stretch flex-column ui-color-main ui-scroll description'>
        <span v-html="state.description | bbcode"></span>
      </div>
    </div>

    <div class='flex-divider'></div>

    <div class='flex-row flex-stretch'>
      <!-- message -->
      <chat-message-list class="flex-stretch" :messages='state.messages'></chat-message-list>

      <div class='flex-divider'></div>

      <!-- users -->
      <div class='flex-fixed ui-color-main ui-scroll character-list'>
        <div v-for='char in groups.friends || []' class='flex-center-children ui-highlight-green'>
          <character :character='char'></character>
          <i class='mdi mdi-heart'></i>
        </div>
        <div v-for='char in groups.bookmarks || []' class='flex-center-children ui-highlight-blue'>
          <character :character='char'></character>
          <i class='mdi mdi-star'></i>
        </div>
        <div v-for='char in groups.admins || []' class='flex-center-children ui-highlight-red'>
          <character :character='char'></character>
        </div>
        <div v-for='char in groups.looking || []' class='flex-center-children'>
          <character :character='char'></character>
        </div>
        <div v-for='char in groups.rest || []' class='flex-center-children'>
          <character :character='char'></character>
        </div>
      </div>
    </div>

    <div class='flex-divider'></div>

    <!-- chatbox -->
    <div class='flex-fixed ui-color-main'>
      <chatbox @submit='chatboxSubmit'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.description
  position: relative
  height: 5em
  padding: 0.3em 0.5em
  line-height: 1.4

  span
    white-space: pre-wrap

.character-list
  width: 11em

  & > div
    padding: 0.2em 0.4em
    justify-content: space-between

.character-list-item
  display: block
  padding: 0.2em 0.6em

.message-list
  padding: 0.3em 0em

.channel-prefs a
  font-size: 0.9em
  display: block
  padding: 0.3em 1em
  cursor: pointer
</style>

<script>
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'
import ChatMessageList from './ChatMessageList.vue'
import ChannelState from '../types/ChannelState'
import {bbcode} from '../modules/filters'
import socket from '../modules/socket'
import {groupSort, compareByField} from '../modules/common'

const compareNames = compareByField('name')

export default {
  components: {
    Chatbox,
    Character,
    ChatMessage,
    ChatMessageList
  },

  props: {
    state: ChannelState
  },

  data () {
    return {
      groups: {}
    }
  },

  vuex: {
    getters: {
      friends: state => state.chat.friends,
      bookmarks: state => state.chat.bookmarks,
      admins: state => state.chat.admins
    }
  },

  methods: {
    chatboxSubmit (message) {
      socket.sendMessage(this.state.id, message)
    }
  },

  watch: {
    'state.characters' (value) {
      const groups = groupSort(value, char => {
        switch (true) {
          case this.friends[char.name] != null:
            return 'friends'
          case this.bookmarks[char.name]:
            return 'bookmarks'
          case this.admins[char.name]:
            return 'admins'
          case char.status === 'looking':
            return 'looking'
          default:
            return 'rest'
        }
      })

      for (let group in groups) {
        groups[group].sort(compareNames)
      }

      this.groups = groups
    }
  },

  filters: {bbcode}
}
</script>
