<template>
  <div class='chat flex-column' @click='checkData($event)'>
    <div class='option-bar flex-fixed flex-row'>
      <ChatOption class='chat-option' v-for='(option, i) in options' v-bind='option' :key='i'></ChatOption>
    </div>
    <div class='divider'></div>
    <div class='flex-grow flex-row'>
      <div class='chat-tabs flex-fixed'>
        <ChatTab v-for='(tab, index) in tabs' :key='index' :tab='tab' :active='tab === currentTab'
          @selected='currentTabIndex = index' @closed='closeTab(tab)'>
        </ChatTab>
      </div>
      <div class='divider'></div>
      <div class='flex-grow flex-column'>
        <ChatDescription class='description flex-fixed' :channel='channel' :private-chat='privateChat'>
        </ChatDescription>
        <div class='divider'></div>
        <template v-if="channel && channel.mode === 'both'">
          <div class='message-tabs flex-fixed flex-row'>
            <a href='#' class='message-tab' :class="currentMode === 'chat' && 'message-tab-active'"
              @click="currentMode = 'chat'"> Chat
            </a>
            <a href='#' class='message-tab' :class="currentMode === 'ads' && 'message-tab-active'"
              @click="currentMode = 'ads'"> Ads
            </a>
          </div>
          <div class='divider'></div>
        </template>
        <MessageList class='chat-messages flex-grow' :messages='messages'></MessageList>
        <div class='divider'></div>
        <Chatbox class='chatbox flex-fixed' @submit='chatboxSubmit' :identity='identity'></Chatbox>
      </div>
      <template v-if='channel'>
        <div class='divider'></div>
        <UserList class='user-list flex-fixed' v-bind='channel'></UserList>
      </template>
      <transition v-for='(overlay, i) in overlays' name='overlay' appear :key='i'>
        <component :is='overlay' @closed='overlays.pop()' @channel-toggled='toggleChannel'
          @private-chat-opened='openPrivateChat'>
        </component>
      </transition>
    </div>
  </div>
</template>

<script>
// components
import Avatar from './Avatar.vue'
import Chatbox from './Chatbox.vue'
import MessageList from './MessageList.vue'
import ChatTab from './ChatTab.vue'
import UserList from './UserList.vue'
import CharacterMenu from './CharacterMenu.vue'
import ChatDescription from './ChatDescription.vue'

// views
import ChannelList from './ChannelList.vue'
import CharacterBrowser from './CharacterBrowser.vue'
import StatusOverlay from './StatusOverlay.vue'
// import OptionBar from './OptionBar.vue'
import ChatOption from './ChatOption.vue'

// etc.
import { store, getters } from '../store'
import { clamp } from '../lib/util'
import { bottomScroll } from '../directives'

export default {
  components: {
    Avatar,
    Chatbox,
    MessageList,
    ChatTab,
    UserList,
    ChatDescription,
    CharacterBrowser,
    ChatOption,
  },
  directives: {
    bottomScroll,
  },
  data() {
    return {
      currentTabIndex: 0,
      overlays: [],
      filters: {
        chat: true,
        lfrp: true,
        admin: true,
        friend: true,
        self: true,
      },
      currentMode: 'chat',
    }
  },
  computed: {
    ...getters({
      identity: 'identity',
      tabs: 'chatTabs',
    }),
    currentTab() {
      const index = clamp(this.currentTabIndex, 0, this.tabs.length)
      return this.tabs[index] || {}
    },
    channel() {
      return this.currentTab.channel
    },
    privateChat() {
      return this.currentTab.privateChat
    },
    messages() {
      const tab = this.channel || this.privateChat || {}
      const { messages = [] } = tab
      if (this.channel && this.channel.mode === 'both') {
        if (this.currentMode === 'chat') {
          return messages.filter(msg => msg.type !== 'lfrp')
        } else {
          return messages.filter(msg => msg.type === 'lfrp')
        }
      } else {
        return messages
      }
    },
    options() {
      const openOverlay = which => () => this.overlays.push(which)
      return [
        {
          icon: 'forum',
          info: 'Join a Channel',
          action: openOverlay(ChannelList),
        },
        {
          icon: 'heart',
          info: 'Browse Online Characters',
          action: openOverlay(CharacterBrowser),
        },
        {
          icon: 'account-settings',
          info: 'Update Your Status',
          action: openOverlay(StatusOverlay),
        },
        {
          icon: 'logout',
          info: 'Log Out / Change Character',
          action: () => store.disconnectFromChatServer(),
        },
        // { info: 'Settings', icon: 'settings' },
      ]
    },
  },
  methods: {
    setCharacterFocus: store.setCharacterFocus,
    toggleChannel(ch) {
      if (!store.isChannelJoined(ch.id)) {
        store.joinChannel(ch.id, ch.name)
      } else {
        store.leaveChannel(ch.id)
      }
    },
    closeTab(tab) {
      if (tab.channel) {
        store.leaveChannel(tab.channel.id)
      } else if (tab.privateChat) {
        store.closePrivateChat(tab.privateChat.partner.name)
      }
    },
    checkData(event) {
      this.checkChannelData(event)
      this.checkCharacterData(event)
    },
    checkChannelData(event) {
      for (const el of event.path) {
        if (el.dataset && el.dataset.channel) {
          const id = el.dataset.channel
          if (store.isChannelJoined(id)) {
            const index = this.tabs.findIndex(tab => tab.channel && tab.channel.id === id)
            if (index > -1) this.currentTabIndex = index
          }
          else {
            store.joinChannel(id)
          }
          event.preventDefault()
          break
        }
      }
    },
    checkCharacterData(event) {
      for (const el of event.path) {
        if (el.dataset && el.dataset.character) {
          if (el.dataset.character === this.identity) {
            this.overlays.push(StatusOverlay)
          } else {
            if (!this.overlays.includes(CharacterMenu)) {
              store.setCharacterFocus(el.dataset.character)
              this.overlays.push(CharacterMenu)
            }
          }
          event.preventDefault()
          break
        }
      }
    },
    openPrivateChat(name) {
      store.openPrivateChat(name)
      store.setCharacterFocus(null)
      this.currentTabIndex = this.tabs.length - 1
    },
    chatboxSubmit(message) {
      const { channel, privateChat } = this.currentTab
      if (channel) {
        store.sendChannelMessage(channel.id, message)
      } else if (privateChat) {
        store.sendPrivateMessage(privateChat.partner.name, message)
      }
    },
  },
}
</script>

<style lang='stylus'></style>

<style lang='stylus' scoped>
@require 'vars'

.divider
  size: 3px
  visibility: hidden
  flex-shrink: 0

.chat
  fullscreen()
  position: fixed
  background: theme-darker(40%)

.header
  background: theme-darker(10%)
  padding: 0.4em 0.7em

.chat-tabs
  background: $theme-color
  width: 12em
  width-limit: 6em 20em
  overflow-y: auto

.user-list
  background: $theme-color
  width: 12em
  width-limit: 6em 20em

.room-filters
  background: theme-darker(30%)

.filter
  margin: 0.4em 0 0.4em 0.7em

.chat-messages
  background: theme-darker(30%)
  overflow-y: auto
  min-height: 0

.message-tabs
  background: theme-darker(30%)

.message-tab
  background: theme-darker(0%)
  padding: 0.3em 0.8em
  opacity: 0.5
  accent-border(bottom)

.message-tab-active
  opacity: 1

.description
  background: theme-darker(10%)
  max-height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chatbox
  background: theme-darker(10%)
  height: 5em

.option-bar
  background: theme-darker(30%)

.chat-option
  padding: 0.5em
</style>
