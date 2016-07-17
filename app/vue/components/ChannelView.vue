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
      <chat-message-list class="flex-stretch" :state='state'></chat-message-list>

      <div class='flex-divider'></div>

      <!-- users -->
      <div class='flex-fixed ui-color-main ui-scroll character-list'>
        <div v-for='char in groups.friends' class='ui-highlight-green'>
          <character :character='char'></character>
          <i class='mdi mdi-heart' style='opacity: 0.8; float: right'></i>
        </div>
        <div v-for='char in groups.bookmarks' class='ui-highlight-blue'>
          <character :character='char'></character>
          <i class='mdi mdi-star' style='opacity: 0.8; float: right'></i>
        </div>
        <div v-for='char in groups.admins' class='ui-highlight-red'>
          <character :character='char'></character>
        </div>
        <div v-for='char in groups.looking'>
          <character :character='char'></character>
        </div>
        <div v-for='char in groups.rest'>
          <character :character='char'></character>
        </div>
      </div>
    </div>

    <div class='flex-divider'></div>

    <!-- chatbox -->
    <div class='flex-fixed ui-color-main'>
      <slot name='chatbox'></slot>
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
  width: 12em

  & > div
    padding: 0.2em 0.4em

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

function compareNames (a, b) {
  return a.name.localeCompare(b.name)
}

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
    return {}
  },

  methods: {
    characterListClicked (event) {
      // TODO: implement data attribute checker in App.vue
      // const character = event.target.getAttribute('data-character')
      // this.$dispatch(CharacterActivated, character)
    }
  },

  computed: {
    groups () {
      const rest = this.state.characters.slice()
      const friends = []
      const bookmarks = []
      const admins = []
      const looking = []

      for (let char of rest) {
        if (this.friends[char.name]) {
          friends.push(char)
          rest.$remove(char)
        } else if (this.bookmarks[char.name]) {
          bookmarks.push(char)
          rest.$remove(char)
        } else if (this.admins[char.name]) {
          admins.push(char)
          rest.$remove(char)
        } else if (char.status === 'looking') {
          looking.push(char)
          rest.$remove(char)
        }
      }

      friends.sort(compareNames)
      bookmarks.sort(compareNames)
      admins.sort(compareNames)
      looking.sort(compareNames)
      rest.sort(compareNames)
      return { friends, bookmarks, admins, looking, rest }
    }
  },

  filters: {bbcode},

  vuex: {
    getters: {
      friends: state => state.chat.friends,
      bookmarks: state => state.chat.bookmarks,
      admins: state => state.chat.admins
    }
  }
}
</script>
