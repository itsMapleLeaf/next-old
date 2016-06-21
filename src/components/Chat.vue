<template>
  <div class='fullscreen box vertical'>
    <div class='box horizontal'>
      <a class='box center hover-darken app-menu-button' @click='setCurrentOverlay("app-menu")'>
        <i class='fa fa-bars'></i>
      </a>
      <div class='box horizontal wrap'>
        <chat-tab v-for='tab in tabs'
        :selected='selectedTabIndex === $index'
        @mousedown='selectedTabIndex = $index'>
          {{ tab.text }}
        </chat-tab>
      </div>
    </div>

    <chat-view>
      <div slot='header'>
        <span class='preserve-space'>{{{ tabState.description }}}</span>
      </div>

      <div slot='content'>
        <div class='chat-message' v-for='msg in tabState.messages'>
          <character :character='msg.character'></character>
          <span style='margin-left: 0.4em'>{{{ msg.message }}}</span>
        </div>
      </div>

      <div slot='sidebar'>
        <character v-for='char in tabState.characters' class='character-list-item hover-darken' :character='char'></character>
      </div>
    </chat-view>

    <div class='fg-color'>
      <chatbox></chatbox>
    </div>
  </div>
</template>

<script>
import Chatbox from './Chatbox.vue'
import ChatTab from './ChatTab.vue'
import ChatView from './ChatView.vue'
import Character from './Character.vue'
import {ChannelState} from '../models'
import {joinedChannels} from '../vuex/getters'
import {setCurrentOverlay} from '../vuex/actions'

export default {
  components: {
    Chatbox,
    ChatTab,
    ChatView,
    Character
  },

  data () {
    return {
      selectedTabIndex: 0,
      nullState: ChannelState('null', 'null')
    }
  },

  computed: {
    tabs () {
      return this.joinedChannels.map(channel => {
        return {
          text: channel.name,
          state: channel
        }
      })
    },

    tabState () {
      return this.$get('tabs[selectedTabIndex].state') || this.nullState
    }
  },

  vuex: {
    getters: {
      joinedChannels
    },
    actions: {
      setCurrentOverlay
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/mixins'

.app-menu-button
  size: 2em

.chat-message
  padding: 0.2em 0.5em

.character-list-item
  display: block
  padding: 0.2em 0.5em
  overflow-wrap: break-word
</style>
