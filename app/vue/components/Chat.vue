<template>
  <div class='flex-column ui-color-dark ui-fullscreen'>
    <nav class='flex-fixed flex-row' style='overflow-x: auto'>
      <shortcut title="Menu" icon="menu" data-push-overlay="menu-overlay"></shortcut>
      <shortcut title="Channels" icon="forum" data-push-overlay="channel-select-overlay"></shortcut>
      <shortcut title="Online Users" icon="heart" data-push-overlay="online-users-overlay"></shortcut>

      <!-- TODO: tab type icons -->
      <chat-tab v-for="(index, tab) in tabList"
        :active="index === tabIndex"
        @selected="tabIndex = index"
        @closed="tab.close()">
        {{tab.title}}
      </chat-tab>
    </nav>

    <!-- <component
      v-if='activeTab'
      :is="activeTab.type + '-view'"
      :state='activeTab.state'>
    </component> -->
  </div>
</template>

<style lang="stylus" scoped>
.header-shortcut
  width: 2em
  height: @width
</style>

<script>
import ChatTab from './ChatTab.vue'
import Chatbox from './Chatbox.vue'
import ChannelView from './ChannelView.vue'
import PrivateChatView from './PrivateChatView.vue'
import socket from '../modules/socket'
// import {pushOverlay} from '../modules/vuex/actions'

// function clamp (num, min, max) {
//   return num < min ? min
//     : num > max ? max
//     : num
// }

// function compareNames (a, b) {
//   return a.name.localeCompare(b.name)
// }

const Shortcut = {
  template: `
    <a href='#' class='flex-fixed flex-center-children header-shortcut'>
      <i :class="'mdi mdi-' + icon" style="pointer-events: none"></i>
    </a>
  `,

  props: {
    icon: String,
    overlay: String
  }
}

export default {
  components: {
    ChatTab,
    ChannelView,
    Chatbox,
    PrivateChatView,
    Shortcut
  },

  data () {
    return {
      channelTabs: {},
      tabIndex: 0,
      viewType: '',
      viewState: {}
    }
  },

  vuex: {
    getters: {
      activeChannels: state => state.chat.activeChannels,
      publicChannels: state => state.chat.publicChannels,
      privateChannels: state => state.chat.privateChannels
    },
    actions: {
      closePrivateChat ({dispatch}, partner) {
        dispatch('RemoveActivePrivateChat', partner)
      },

      addNotice ({dispatch}, text) {
        dispatch('SetNewNotice', text)
      }
    }
  },

  ready () {
    // TODO: probably write up a simple sound API to make this less ugly
    document.querySelector('#sound-notify').volume = 0.5
  },

  computed: {
    tabList () {
      const channelTabs = {}
      for (let id of this.activeChannels) {
        const info = this.publicChannels[id] || this.privateChannels[id]
        channelTabs[id] = {
          title: info.name,
          close: () => socket.leaveChannel(id)
        }
      }

      const tabs = Object.values(this.channelTabs = channelTabs)
      this.tabIndex = Math.min(Math.max(this.tabIndex, 0), tabs.length - 1)
      return tabs
    },

    activeTab () {
      return this.tabs[this.tabIndex]
    },

    currentPrivateChatPartner () {
      if (this.activeTab && this.activeTab.type === 'private-chat') {
        return this.activeTab.state.partner.name
      }
    }
  },

  methods: {
    closeTab (tab) {
      if (tab.close) tab.close()
    }
  },

  watch: {
    newPrivateMessage ({ sender, message }) {
      if (this.currentPrivateChatPartner !== sender.name) {
        this.addNotice(`${sender.name}: ${message}`)
        document.querySelector('#sound-notify').currentTime = 0
        document.querySelector('#sound-notify').play()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
