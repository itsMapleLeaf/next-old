<template>
  <div class='fullscreen box vertical'>
    <div class='box horizontal'>
      <a class='box center hover-darken app-menu-button'
      @click="$dispatch('overlay-change-request', 'app-menu')">
        <i class='fa fa-bars'></i>
      </a>
      <div class='box grow horizontal wrap'>
        <chat-tab v-for='tab in tabs'
        :selected='selectedTabIndex === $index'
        @mousedown='selectedTabIndex = $index'>
          {{ tab.title }}
        </chat-tab>
      </div>
    </div>

    <component :is="currentTab.view"
    :view-state="currentTab.state"></component>
  </div>
</template>

<script>
import ChatTab from './ChatTab.vue'
import ChannelView from './ChannelView.vue'
import PrivateChatView from './PrivateChatView.vue'
import {userChannels, privateMessages} from '../vuex/getters'
import {ChannelState} from '../models'

const nullTab = { text: 'null tab', view: '' }

export default {
  components: {
    ChatTab,
    ChannelView,
    PrivateChatView
  },

  data () {
    return {
      tabs: [],
      selectedTabIndex: 0
    }
  },

  computed: {
    currentTab () {
      this.selectedTabIndex = Math.min(Math.max(this.selectedTabIndex, 0), this.tabs.length - 1)
      const current = this.tabs[this.selectedTabIndex]
      return current || nullTab
    }
  },

  created () {
    this.$on('channel-joined', this.channelJoined)
    this.$on('left-channel', this.leftChannel)
    this.$on('chatbox-message-sent', this.messageSent)
    this.$on('private-message-received', this.privateMessageReceived)
    this.$on('chatbox-message-sent', this.chatboxMessageSent)
  },

  methods: {
    channelJoined (channel) {
      const tabState = {
        view: 'channel-view',
        title: channel.name,
        state: channel
      }
      this.tabs.push(tabState)
    },

    leftChannel (channel) {
      this.tabs = this.tabs.filter(tab => {
        if (tab.view === 'channel-view' && tab.state.id === channel.id) {
          return false
        }
        return true
      })
    },

    privateMessageReceived (charname, message) {
      const filter = tab => tab.view === 'private-chat-view' && tab.state.character.name === charname
      let tabState = this.tabs.find(filter)
      if (!tabState) {
        tabState = {
          view: 'private-chat-view',
          title: charname,
          state: this.privateMessages[charname]
        }
        this.tabs.push(tabState)
      }
    },

    messageSent (message) {},

    chatboxMessageSent (message) {
      const tab = this.currentTab
      if (tab.view === 'private-chat-view') {
        this.$dispatch('private-message-sent', tab.state.character, message)
      }
    }
  },

  vuex: {
    getters: {
      userChannels,
      privateMessages
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/mixins'

.app-menu-button
  size: 2em
</style>
