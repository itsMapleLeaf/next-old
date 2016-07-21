<template>
  <div class='flex-column ui-color-dark ui-fullscreen'>
    <nav class='flex-fixed flex-row' style='overflow-x: auto'>
      <shortcut title="Menu" icon="menu" data-push-overlay="menu-overlay"></shortcut>
      <shortcut title="Channels" icon="forum" data-push-overlay="channel-select-overlay"></shortcut>
      <shortcut title="Online Users" icon="heart" data-push-overlay="online-users-overlay"></shortcut>

      <chat-tab v-for="(index, tab) in tabList"
        :title="tab.title"
        :active="index === tabIndex"
        @selected="tabIndex = index"
        @closed="closeTab(tab)">
        <span class='tab-icon'>
          <template v-if="tab.type === 'channel'">
            <i v-if="tab.state.id === tab.state.name" class='mdi mdi-earth'></i>
            <i v-else class='mdi mdi-key-variant'></i>
          </template>
          <div v-if="tab.type === 'private-chat'"
            class='tab-avatar'
            :style="'background-image: url(' + getAvatarURL(tab.state.partner.name) + ')'">
          </div>
        </span>
        <span v-html="tab.title"></span>
      </chat-tab>
    </nav>

    <component v-if="activeTab"
      :is="activeTab.type + '-view'"
      :state="activeTab.state">
    </component>
  </div>
</template>

<style scoped>
.header-shortcut {
  width: 2em;
  height: 2em;
}

.tab-icon {
  margin-right: 0.2em;
}

.tab-avatar {
  width: 1em;
  height: 1em;
  background-size: contain;
}
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
    <a href='#' class='flex-fixed flex-center-children ui-press ui-hover header-shortcut'>
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
      tabIndex: 0,
      viewType: '',
      viewState: {},
      getAvatarURL
    }
  },

  vuex: {
    getters: {
      activeChannels: state => state.chat.activeChannels,
      channelState: state => state.chat.channelState,
      activePrivateChats: state => state.chat.activePrivateChats,
      privateChatState: state => state.chat.privateChatState,
      onlineCharacters: state => state.chat.characters,
      newPrivateMessage: state => state.chat.newPrivateMessage,
      newActiveChannel: state => state.chat.newActiveChannel
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
      const tabs = []

      for (let id of this.activeChannels) {
        const state = this.channelState[id]
        tabs.push({
          type: 'channel',
          title: state.name,
          state: this.channelState[id]
        })
      }

      for (let partner of this.activePrivateChats) {
        tabs.push({
          type: 'private-chat',
          title: partner,
          state: this.privateChatState[partner]
        })
      }

      this.tabIndex = Math.min(Math.max(this.tabIndex, 0), tabs.length - 1)

      return tabs
    },

    activeTab () {
      return this.tabList[this.tabIndex]
    },

    activePrivateChatPartner () {
      if (this.activeTab && this.activeTab.type === 'private-chat') {
        return this.activeTab.state.partner.name
      }
    }
  },

  methods: {
    closeTab (tab) {
      if (tab.type === 'channel') {
        socket.leaveChannel(tab.state.id)
      } else if (tab.type === 'private-chat') {
        this.closePrivateChat(tab.state.partner.name)
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
    },

    'activeChannels.length' (current, prev) {
      if (current > prev) {
        const id = this.activeChannels[current - 1]
        for (let index in this.tabList) {
          const tab = this.tabList[index]
          if (tab.type === 'channel' && tab.state.id === id) {
            this.tabIndex = index
            break
          }
        }
      }
    }
  }
}
</script>
