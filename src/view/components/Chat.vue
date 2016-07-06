<template>
  <div class='flex col ui theme-color dark fullscreen'>
    <div class='flex row fixed' style='flex-wrap: wrap'>
      <shortcut title="Actions" icon="bars" overlay="app-menu"></shortcut>
      <shortcut title="Channels" icon="globe" overlay="channel-list"></shortcut>
      <shortcut title="Users" icon="heart" overlay="online-users"></shortcut>

      <chat-tab v-for="chat in activeChats"
        :active="$index === currentIndex"
        @selected="currentIndex = $index"
        @closed="closeChat(chat)">
        {{chat.name}}
      </chat-tab>
    </div>

    <!-- <component :is="currentTab.view" :view-state="currentTab.state">
    </component> -->
  </div>
</template>

<style lang="stylus" scoped>
.header-shortcut
  width: 2em
  height: @width
</style>

<script>
import ChatTab from './elements/ChatTab.vue'
// import ChannelView from './chat-views/ChannelView.vue'
// import PrivateChatView from './chat-views/PrivateChatView.vue'

import {store, state} from 'modules/store'

function clamp (num, min, max) {
  return num < min ? min
    : num > max ? max
    : num
}

const Shortcut = {
  template: `
    <a class='ui hover-darken flex fixed center-content header-shortcut'
      title="Actions"
      @click="pushOverlay">
      <i class='fa fa-{{icon}}'></i>
    </a>
  `,

  props: {
    icon: String,
    overlay: String
  },

  methods: {
    pushOverlay () {
      store.notify('PushOverlay', { overlay: this.overlay })
    }
  }
}

export default {
  components: {
    ChatTab,
    // ChannelView,
    // PrivateChatView,
    Shortcut
  },

  data () {
    return {
      state,
      currentIndex: 0
    }
  },

  computed: {
    activeChats () {
      return store.getActiveChats()
    },

    currentChat () {
      return this.activeChats[this.currentIndex]
    }
  },

  methods: {
    closeChat (chat) {
      if (chat.type === 'channel') {
        store.notify('LeaveChannelRequest', { id: chat.id })
        this.currentIndex--
      }
    }
  },

  watch: {
    activeChats () {
      this.currentIndex = clamp(this.currentIndex, 0, this.activeChats.length - 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
