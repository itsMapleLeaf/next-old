<template>
  <main class='flex-column flex-stretch'>
    <section class='flex-row flex-fixed channel-head'>
      <!-- channel prefs -->
      <!-- <section class='flex fixed col channel-prefs' style='justify-content: space-between'>
        <template v-if="viewState.mode === 'both'">
          <a class="ui theme-color {{viewState.preference === 'both' ? 'light' : 'darker'}}" @click="viewState.preference = 'both'">Both</a>
          <a class="ui theme-color {{viewState.preference === 'chat' ? 'light' : 'darker'}}" @click="viewState.preference = 'chat'">Chat</a>
          <a class="ui theme-color {{viewState.preference === 'ads' ? 'light' : 'darker'}}" @click="viewState.preference = 'ads'">LFRP</a>
        </template>
        <template v-if="viewState.mode === 'chat'">
          <a class="ui theme-color darker subtle">Both</a>
          <a class="ui theme-color light">Chat</a>
          <a class="ui theme-color darker subtle">LFRP</a>
        </template>
        <template v-if="viewState.mode === 'ads'">
          <a class="ui theme-color darker subtle">Both</a>
          <a class="ui theme-color darker subtle">Chat</a>
          <a class="ui theme-color light">LFRP</a>
        </template>
      </section> -->

      <div class='flex-divider'></div>

      <!-- description -->
      <section class='flex-stretch flex-column ui-main scroll-y description'>
        <span v-html="description | bbcode"></span>
      </section>
    </section>

    <div class='flex-divider'></div>

    <section class='flex-row flex-stretch'>
      <!-- message -->
      <chat-message-list class="flex-stretch" :messages='messages'></chat-message-list>

      <div class='flex-divider'></div>

      <!-- users -->
      <ul class='flex-fixed ui-main scroll-y character-list'>
        <li v-for='char in characters'>
          <character :name='char.name' :gender='char.gender' :status='char.status.state'></character>
        </li>
        <!-- <li class='ui hover-darken highlight green' v-for='char in characterGroups.friends'>
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
        </li> -->
      </ul>
    </section>

    <div class='flex-divider'></div>

    <!-- chatbox -->
    <section class='flex-fixed ui-main'>
      <slot name='chatbox'></slot>
    </section>
  </main>
</template>

<style lang="stylus" scoped>
ul
  list-style: none

.description
  position: relative
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

.channel-prefs a
  font-size: 0.9em
  display: block
  padding: 0.3em 1em
  cursor: pointer
</style>

<script>
import Chatbox from '../elements/Chatbox.vue'
import Character from '../elements/Character.vue'
import ChatMessage from '../elements/ChatMessage.vue'
import ChatMessageList from '../elements/ChatMessageList.vue'

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
    messages: Array,
    characters: Array,
    description: String
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
    },

    getChannelPrefClass (which) {
      if (which === 'both') {
        if (this.viewState.mode === 'both') {
          if (this.viewState.preference === 'both') {
            return 'light'
          } else {
            return 'darker'
          }
        } else {
          return 'darker subtle'
        }
      }
    },

    chatboxSubmit (message) {

    }
  }
}
</script>
