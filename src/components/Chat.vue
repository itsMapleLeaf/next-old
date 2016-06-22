<template>
  <div class='fullscreen box vertical'>
    <div class='box horizontal'>
      <a class='box center hover-darken app-menu-button'
      @click="$dispatch('overlay-change-request', 'app-menu')">
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
      <div slot='header' class='room-info'>
        <span>{{{ currentTab.channel.description | bbcode }}}</span>
      </div>

      <div slot='content'>
        <chat-message v-for='msg in currentTab.channel.messages'
        :character='msg.character'
        :message='msg.message'>
        </chat-message>
      </div>

      <div slot='sidebar'>
        <character v-for='char in currentTab.channel.characters' class='character-list-item hover-darken' :character='char'></character>
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
import ChatMessage from './ChatMessage.vue'
import {userChannels} from '../vuex/getters'
import {ChannelState} from '../models'

export default {
  components: {
    Chatbox,
    ChatTab,
    ChatView,
    Character,
    ChatMessage
  },

  data () {
    return {
      tabs: [],
      selectedTabIndex: 0
    }
  },

  computed: {
    currentTab () {
      for (let id in this.userChannels) {
        const channel = this.userChannels[id]
        const existing = this.tabs.find(tab => tab.channel === channel)
        if (!existing) {
          this.tabs.push({ text: channel.name, channel })
        }
      }

      this.tabs = this.tabs.filter(tab => {
        return tab.channel.status === 'joined'
      })

      return this.tabs[this.selectedTabIndex] || {
        text: '',
        channel: ChannelState('null channel', 'null channel')
      }
    }
  },

  vuex: {
    getters: {
      userChannels
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/mixins'

.app-menu-button
  size: 2em

.character-list-item
  display: block
  padding: 0.2em 0.5em
  overflow-wrap: break-word

.room-info
  padding: 0.3em 0.5em
  line-height: 1.5

  span
    white-space: pre-wrap
</style>
