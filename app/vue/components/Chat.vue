<template>
  <div class='flex-column ui-color-dark ui-fullscreen'>
    <nav class='flex-row flex-fixed' style='flex-wrap: wrap'>
      <shortcut title="Actions" icon="menu" data-push-overlay="menu-overlay"></shortcut>
      <shortcut title="Channels" icon="earth" data-push-overlay="channel-select-overlay"></shortcut>
      <shortcut title="Users" icon="heart" data-push-overlay="online-users-overlay"></shortcut>

      <chat-tab v-for="(index, chat) in activeChannels"
        :active="index === tabIndex"
        @selected="tabIndex = index"
        @closed="closeChat(chat.id)">
        {{chat.name}}
      </chat-tab>
    </nav>

    <!-- <channel-view v-if="currentChat && currentChat.type === 'channel'"
      :messages="currentChat.message"
      :characters="currentChat.characters"
      :description="currentChat.description">
      <chatbox slot='chatbox'
        @chatbox-submit="chatboxSubmit">
      </chatbox>
    </channel-view> -->
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
// import PrivateChatView from './PrivateChatView.vue'
// import {pushOverlay} from '../modules/vuex/actions'

// function clamp (num, min, max) {
//   return num < min ? min
//     : num > max ? max
//     : num
// }

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
    // PrivateChatView,
    Shortcut
  },

  data () {
    return {
      tabIndex: 0
    }
  },

  vuex: {
    actions: {
      closeChat (store) {}
    },
    getters: {
      activeChannels: state => Object.values(state.chat.activeChannels)
    }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
