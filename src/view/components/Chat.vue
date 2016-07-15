<template>
  <div class='flex-column ui-color-dark ui-fullscreen'>
    <nav class='flex-row flex-fixed' style='flex-wrap: wrap'>
      <shortcut title="Actions" icon="bars" overlay="app-menu"></shortcut>
      <shortcut title="Channels" icon="globe" overlay="channel-list"></shortcut>
      <shortcut title="Users" icon="heart" overlay="online-users"></shortcut>

      <chat-tab v-for="chat in activeChats"
        :active="$index === currentIndex"
        @selected="currentIndex = $index"
        @closed="closeChat(chat)">
        {{chat.name}}
      </chat-tab>
    </nav>

    <channel-view v-if="currentChat && currentChat.type === 'channel'"
      :messages="currentChat.message"
      :characters="currentChat.characters"
      :description="currentChat.description">
      <chatbox slot='chatbox'
        @chatbox-submit="chatboxSubmit">
      </chatbox>
    </channel-view>
  </div>
</template>

<style lang="stylus" scoped>
.header-shortcut
  width: 2em
  height: @width
</style>

<script>
import ChatTab from './elements/ChatTab.vue'
import Chatbox from './elements/Chatbox.vue'
import ChannelView from './chat-views/ChannelView.vue'
// import PrivateChatView from './chat-views/PrivateChatView.vue'
import {pushOverlay} from '../vuex/actions'

function clamp (num, min, max) {
  return num < min ? min
    : num > max ? max
    : num
}

const Shortcut = {
  template: `
    <a class='flex-fixed flex-center-children header-shortcut'
      title="Actions" @click="pushOverlay(overlay)">
      <i class='fa fa-{{icon}}'></i>
    </a>
  `,

  props: {
    icon: String,
    overlay: String
  },

  vuex: {
    getters: {
      activeChannels: state => state.chat.activeChannels
    },
    actions: {pushOverlay}
  }
}

export default {
  components: {
    ChatTab,
    ChannelView,
    Chatbox,
    // PrivateChatView,
    Shortcut
  },

  data () {
    return {
      currentIndex: 0
    }
  },

  methods: {
    closeChat (chat) {
      // if (chat.type === 'channel') {
      //   store.notify('LeaveChannelRequest', { id: chat.id })
      //   this.currentIndex--
      // }
    },

    chatboxSubmit (message) {
      console.info(message)
    }
  },

  watch: {
    // activeChats () {
    //   this.currentIndex = clamp(this.currentIndex, 0, this.activeChats.length - 1)
    // }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
