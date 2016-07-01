<template>
  <div class='flex col ui theme-color dark fullscreen'>
    <div class='flex row fixed' style='flex-wrap: wrap'>
      <!-- app menu shortcut -->
      <a class='ui hover-darken flex fixed center-content header-shortcut'
      title="Actions"
      @click="openAppMenu">
        <i class='fa fa-bars'></i>
      </a>

      <!-- channel list shortcut -->
      <a class='ui hover-darken flex fixed center-content header-shortcut'
      title="Channels"
      @click="openChannelList">
        <i class='fa fa-globe'></i>
      </a>

      <!-- user list shortcut -->
      <a class='ui hover-darken flex fixed center-content header-shortcut'
      title="Online Users"
      @click="openOnlineUsers">
        <i class='fa fa-heart'></i>
      </a>

      <chat-tab v-for='tab in tabs'
      :active='activeTabIndex === $index'
      :title='tab.title'
      @closed='closeTab(tab)'
      @mousedown='activeTabIndex = $index'>
        {{ tab.title }}
      </chat-tab>
    </div>

    <component :is="currentTab.view" :view-state="currentTab.state">
    </component>
  </div>
</template>

<style lang="stylus" scoped>
.header-shortcut
  width: 2em
  height: @width
</style>

<script>
import ChatTab from './elements/ChatTab.vue'
import ChannelView from './chat-views/ChannelView.vue'
import PrivateChatView from './chat-views/PrivateChatView.vue'

import state from '../lib/state'
import * as events from '../lib/events'

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
      activeTabIndex: 0,
      state
    }
  },

  computed: {
    currentTab () {
      return this.tabs[this.activeTabIndex] || nullTab
    }
  },

  events: {
    [events.SocketChannelJoined] (channel) {
      this.addTab({
        view: 'channel-view',
        title: channel.name,
        state: channel
      })
      this.activeTabIndex = this.tabs.length - 1
    },

    [events.SocketChannelLeft] (channel) {
      this.tabs = this.tabs.filter(tab => {
        if (tab.view === 'channel-view' && tab.state.id === channel.id) {
          this.activeTabIndex = Math.max(this.activeTabIndex - 1, 0)
          return false
        }
        return true
      })
    },

    [events.ChatboxSubmit] (message) {
      const tab = this.currentTab
      if (tab.view === 'private-chat-view') {
        this.$dispatch(events.PrivateMessageSent, tab.state.character, message)
      } else if (tab.view === 'channel-view') {
        this.$dispatch(events.ChannelMessageSent, tab.state.id, message)
      }
    },

    [events.PrivateMessageReceived] (name, message) {
      this.addPrivateChat(name)
    },

    [events.OpenPrivateChatRequest] (name) {
      this.activeTabIndex = this.addPrivateChat(name)
    }
  },

  methods: {
    openAppMenu () {
      this.$dispatch(events.PushOverlay, 'app-menu')
    },

    openChannelList () {
      this.$dispatch(events.PushOverlay, 'channel-list')
    },

    openOnlineUsers () {
      this.$dispatch(events.PushOverlay, 'online-users')
    },

    closeTab (tab) {
      if (tab.view === 'channel-view') {
        this.$dispatch(events.LeaveChannelRequest, tab.state.id)
      }
      this.tabs.$remove(tab)
      this.activeTabIndex--
    },

    addTab (tabState) {
      this.tabs.push(tabState)
      return tabState
    },

    addPrivateChat (partner) {
      const index = this.tabs.findIndex(tab => {
        return tab.view === 'private-chat-view' && tab.state.character.name === partner
      })

      // add a new PM tab if we couldn't find one
      if (index === -1) {
        this.addTab({
          view: 'private-chat-view',
          title: partner,
          state: this.state.getPrivateChat(partner)
        })
        return this.tabs.length - 1
      }

      // return the index so we can set the active tab if we want
      return index
    }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
