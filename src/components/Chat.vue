<template>
  <div class='flex col ui theme-color dark fullscreen'>
    <div class='flex fixed row'>
      <a class='ui hover-darken flex fixed app-menu-button'
      @click="$dispatch('overlay-change-request', 'app-menu')">
        <i class='fa fa-bars'></i>
      </a>

      <div class='flex row stretch' style="flex-wrap: wrap-reverse">
        <chat-tab v-for='tab in tabs'
        :active='activeTabIndex === $index'
        @mousedown='activeTabIndex = $index'>
          {{ tab.title }}
        </chat-tab>
      </div>
    </div>

    <component :is="currentTab.view"
    :view-state="currentTab.state"
    @message-sent='messageSent'>
    </component>
  </div>
</template>

<style lang="stylus" scoped>
.app-menu-button
  width: 2em
  height: 2em
  display: flex
  align-items: center
  justify-content: center
</style>

<script>
import ChatTab from './ChatTab.vue'
import ChannelView from './ChannelView.vue'
import PrivateChatView from './PrivateChatView.vue'
import state from '../lib/state'

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
      this.activeTabIndex = Math.min(Math.max(this.activeTabIndex, 0), this.tabs.length - 1)
      const current = this.tabs[this.activeTabIndex]
      return current || nullTab
    }
  },

  ready () {
    this.$on('joined-channel', this.joinedChannel)
    this.$on('left-channel', this.leftChannel)
    this.$on('private-message-received', this.privateMessageReceived)
    this.$on('chatbox-message-sent', this.chatboxMessageSent)
  },

  methods: {
    joinedChannel (channel) {
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
      let tabState = this.tabs.find(tab => {
        return tab.view === 'private-chat-view' && tab.state.character.name === charname
      })

      if (!tabState) {
        tabState = {
          view: 'private-chat-view',
          title: charname,
          state: this.state.getPrivateChat(charname)
        }
        this.tabs.push(tabState)
      }
    },

    messageSent (message) {
      const tab = this.currentTab
      if (tab.view === 'private-chat-view') {
        this.$emit('private-message-sent', tab.state.character, message)
      } else if (tab.view === 'channel-view') {
        this.$emit('channel-message-sent', tab.state.id, message)
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
