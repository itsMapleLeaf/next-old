<template>
  <div class='flex-column ui-color-dark ui-fullscreen'>
    <nav class='flex-fixed flex-row' style='overflow-x: auto'>
      <shortcut title="Actions" icon="menu" data-push-overlay="menu-overlay"></shortcut>
      <shortcut title="Channels" icon="earth" data-push-overlay="channel-select-overlay"></shortcut>
      <shortcut title="Users" icon="heart" data-push-overlay="online-users-overlay"></shortcut>

      <chat-tab v-for="(index, tab) in tabs"
        :active="index === tabIndex"
        @selected="tabIndex = index"
        @closed="closeChat(chat.id)">
        {{tab.text}}
      </chat-tab>
    </nav>

    <template v-if='activeTab'>
      <channel-view
        v-if="activeTab.type === 'channel'"
        :state='activeTab.state'>
      </channel-view>

      <private-chat-view
        v-if="activeTab.type === 'private-chat'"
        :state='activeTab.state'>
      </private-chat-view>
    </template>
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
// import {pushOverlay} from '../modules/vuex/actions'

// function clamp (num, min, max) {
//   return num < min ? min
//     : num > max ? max
//     : num
// }

function compareNames (a, b) {
  return a.name.localeCompare(b.name)
}

const Shortcut = {
  template: `
    <a href='#' class='flex-fixed flex-center-children header-shortcut'
      title="Actions">
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
      viewState: {}
    }
  },

  computed: {
    tabs () {
      const channels = this.activeChannels.map(ch => {
        return { text: ch.name, type: 'channel', state: ch }
      })

      const privateChats = this.activePrivateChats.map(ch => {
        return { text: ch.partner.name, type: 'private-chat', state: ch }
      })

      return channels.concat(privateChats)
    },

    activeTab () {
      return this.tabs[this.tabIndex]
    }
  },

  methods: {
    selectChannelTab (channel, tabIndex) {
      this.tabIndex = tabIndex
      this.viewType = 'channel'
      this.viewState = channel
    }
  },

  vuex: {
    actions: {
      closeChat (store) {}
    },
    getters: {
      activeChannels: state => Object.values(state.chat.activeChannels).sort(compareNames),
      activePrivateChats: state => Object.values(state.chat.activePrivateChats).sort(compareNames)
    }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
