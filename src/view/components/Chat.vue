<template>
  <div class='flex col ui theme-color dark fullscreen'>
    <div class='flex row fixed' style='flex-wrap: wrap'>
      <shortcut title="Actions" icon="bars" overlay="app-menu"></shortcut>
      <shortcut title="Channels" icon="globe" overlay="channel-list"></shortcut>
      <shortcut title="Users" icon="heart" overlay="online-users"></shortcut>

      <chat-tab v-for='tab in tabs'
      :active='activeTabIndex === $index'
      :title='tab.title'
      @closed='closeTab(tab)'
      @selected='activeTabIndex = $index'>
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
import storage from '../lib/storage'
import * as events from '../lib/events'
import {ChannelType} from '../lib/types'

const nullTab = { text: 'null tab', view: '' }

const Shortcut = {
  template: `
    <a class='ui hover-darken flex fixed center-content header-shortcut'
    title="Actions"
    @click="pushOverlay(overlay)">
      <i class='fa fa-{{icon}}'></i>
    </a>
  `,

  props: {
    icon: String,
    overlay: String
  },

  methods: {
    pushOverlay (overlay) {
      this.$dispatch(events.PushOverlay, overlay)
    }
  }
}

export default {
  components: {
    ChatTab,
    ChannelView,
    PrivateChatView,
    Shortcut
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
      this.activeTabIndex = this.addChannelTab(channel)
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
    },

    [events.ChatStateReset] () {
      this.tabs = []
    }
  },

  methods: {
    addTab (tabState) {
      this.tabs.push(tabState)
      return this.tabs.length - 1 // return the index so we can set the active tab if if needed
    },

    createChannelTabState (channel) {
      return {
        view: 'channel-view',
        title: channel.name,
        state: channel
      }
    },

    addChannelTab (channel) {
      this.addTab({
        view: 'channel-view',
        title: channel.name,
        state: channel
      })
      return this.tabs.length - 1
    },

    addPrivateChat (partner) {
      // try to find an already active private chat
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

      return index
    },

    closeTab (tab) {
      if (tab.view === 'channel-view') {
        this.$dispatch(events.LeaveChannelRequest, tab.state.id)
      }
      this.tabs.$remove(tab)
      this.activeTabIndex--
    }
  },

  watch: {
    tabs (_, tablist) {
      const channels = tablist.filter(tab => tab.view === 'channel-view')

      const pubChannels = channels
        .filter(tab => tab.state.type === ChannelType.public)
        .map(tab => tab.state.id)

      const privChannels = channels
        .filter(tab => tab.state.type === ChannelType.private)
        .map(tab => tab.state.id)

      storage.setActiveChannels(
        this.state.getAccount(),
        this.state.getUserCharacterName(),
        { public: pubChannels, private: privChannels })
    }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
