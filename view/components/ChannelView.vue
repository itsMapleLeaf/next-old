<template>
  <div class='flex col stretch'>
    <!-- description -->
    <div class='flex fixed ui theme-color main scroll description'>
      <span v-html="viewState.description | bbcode"></span>
    </div>

    <div class='flex row stretch'>
      <!-- message -->
      <chat-message-list class="flex stretch" :messages='viewState.messages'></chat-message-list>

      <!-- users -->
      <div class='flex fixed ui theme-color main scroll character-list'>
        <ul>
          <li class='ui hover-darken highlight green' v-for='char in characterGroups.friends'>
            <character class='character-list-item' :character='char'></character>
          </li>
          <li class='ui hover-darken highlight blue' v-for='char in characterGroups.bookmarks'>
            <character class='character-list-item' :character='char'></character>
          </li>
          <li class='ui hover-darken highlight red' v-for='char in characterGroups.admins'>
            <character class='character-list-item' :character='char'></character>
          </li>
          <li class='ui hover-darken' v-for='char in characterGroups.looking'>
            <character class='character-list-item' :character='char'></character>
          </li>
          <li class='ui hover-darken' v-for='char in characterGroups.rest'>
            <character class='character-list-item' :character='char'></character>
          </li>
        </ul>
      </div>
    </div>

    <!-- chatbox -->
    <div class='flex fixed ui theme-color main'>
      <chatbox class='chatbox'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
ul
  list-style: none

.description
  height: 5em
  padding: 0.3em 0.5em
  line-height: 1.4

  span
    white-space: pre-wrap

.chatbox
  height: 5em

.character-list
  width: 12em

.character-list-item
  display: block
  padding: 0.2em 0.6em

.message-list
  padding: 0.3em 0em
</style>

<script>
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'
import ChatMessageList from './ChatMessageList.vue'
import state from '../lib/state'
import {CharacterActivated} from '../lib/events'

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
    viewState: Object
  },

  data () {
    return { state }
  },

  computed: {
    characterGroups () {
      const groups = {
        friends: [],
        bookmarks: [],
        admins: [],
        looking: [],
        rest: []
      }

      this.viewState.characters.forEach(char => {
        if (this.state.getFriendship(char.name).length > 0) {
          groups.friends.push(char)
        } else if (this.state.isBookmarked(char.name)) {
          groups.bookmarks.push(char)
        } else if (this.state.isAdmin(char.name)) {
          groups.admins.push(char)
        } else if (char.status === 'looking') {
          groups.looking.push(char)
        } else {
          groups.rest.push(char)
        }
      })

      for (let group in groups) {
        groups[group].sort(compareNames)
      }

      return groups
    }
  },

  methods: {
    characterListClicked (event) {
      const character = event.target.getAttribute('data-character')
      this.$dispatch(CharacterActivated, character)
    }
  }
}
</script>
