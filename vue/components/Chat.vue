<template>
  <div class='flex-column ui-color-dark ui-fullscreen'>
    <nav class='flex-fixed flex-row' style='overflow-x: auto'>
      <shortcut title="Menu" icon="menu" data-push-overlay="menu-overlay"></shortcut>
      <shortcut title="Channels" icon="forum" data-push-overlay="channel-select-overlay"></shortcut>
      <shortcut title="Online Users" icon="heart" data-push-overlay="online-users-overlay"></shortcut>

      <chat-tab v-for="(index, tab) in tabList"
        :active="index === tabIndex"
        @selected="tabIndex = index"
        @closed="closeTab(tab)">
        <template v-if="tab.type === 'channel'">
          <i v-if="tab.state.id === tab.state.name" class='mdi mdi-earth'></i>
          <i v-else class='mdi mdi-key-variant'></i>
        </template>
        <img v-if="tab.type === 'private-chat'" class='tab-avatar' :src="getAvatarURL(tab.partner.name)" />
        <span v-html="tab.title"></span>
      </chat-tab>
    </nav>

    <template v-if="activeTab">
      <channel-view
        v-if="activeTab.type === 'channel'"
        :state='activeTab.state'>
      </channel-view>
      <private-chat-view
        v-if="activeTab.type === 'private-chat'"
        :messages='activeTab.messages'
        :partner='activeTab.partner'>
      </private-chat-view>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
.header-shortcut
  width: 2em
  height: @width

.tab-avatar
  height: 1em
  vertical-align: top
</style>

<script>
import ChatTab from './ChatTab.vue'
import Chatbox from './Chatbox.vue'
import ChannelView from './ChannelView.vue'
import PrivateChatView from './PrivateChatView.vue'
import socket from '../modules/socket'
import {getAvatarURL} from '../modules/flist'
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
      privateChatTabs: {},
      tabIndex: 0,
      viewType: '',
      viewState: {},
      getAvatarURL
    }
  },

  vuex: {
    getters: {
      publicChannels: state => state.chat.publicChannels,
      privateChannels: state => state.chat.privateChannels,
      activeChannels: state => state.chat.activeChannels,
      channelState: state => state.chat.channelState,
      activePrivateChats: state => state.chat.activePrivateChats,
      privateMessages: state => state.chat.privateMessages,
      onlineCharacters: state => state.chat.characters,
      newPrivateMessage: state => state.chat.newPrivateMessage
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
    document.querySelector('#sound-notify').volume = 0.3
  },

  computed: {
    tabList () {
      const channelTabs = {}
      for (let id of this.activeChannels) {
        const info = this.publicChannels[id] || this.privateChannels[id]
        channelTabs[id] = {
          type: 'channel',
          title: info.name,
          state: this.channelState[id]
        }
      }

      const privateTabs = {}
      for (let partner of this.activePrivateChats) {
        privateTabs[partner] = {
          type: 'private-chat',
          title: partner,
          messages: this.privateMessages[partner],
          partner: this.onlineCharacters[partner]
        }
      }

      const tabs = Object.values(this.privateChatTabs = privateTabs)
        .concat(Object.values(this.channelTabs = channelTabs))

      this.tabIndex = Math.min(Math.max(this.tabIndex, 0), tabs.length - 1)

      return tabs
    },

    activeTab () {
      return this.tabList[this.tabIndex]
    },

    activePrivateChatPartner () {
      if (this.activeTab && this.activeTab.type === 'private-chat') {
        return this.activeTab.partner.name
      }
    }
  },

  methods: {
    closeTab (tab) {
      if (tab.type === 'channel') {
        socket.leaveChannel(tab.state.id)
      } else if (tab.type === 'private-chat') {
        this.closePrivateChat(tab.partner.name)
      }
    }
  },

  watch: {
    newPrivateMessage ({ sender, message }) {
      if (!document.hasFocus() || this.activePrivateChatPartner !== sender.name) {
        this.addNotice(`${sender.name}: ${message}`)
        document.querySelector('#sound-notify').currentTime = 0
        document.querySelector('#sound-notify').play()
      }
    }
  }
}
</script>
