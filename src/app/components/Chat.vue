<template>
  <div class='chat flex-column' @click='checkData($event)'>
    <div class='flex-grow flex-row'>
      <OptionBar class='option-bar flex-fixed' :options='options'></OptionBar>
      <div class='chat-tabs flex-fixed'>
        <ChatTab v-for='(tab, index) in tabs' :tab='tab' :active='tab === currentTab'
          @selected='currentTabIndex = index' @closed='closeTab(tab)'>
        </ChatTab>
      </div>
      <div class='divider'></div>
      <div class='flex-grow flex-column'>
        <template v-if='channel'>
          <div class='room-filters flex-fixed'>
            <ChatFilter class='filter' v-for='label in filterLabels' v-model='filters[label.filter]'
              :disabled='isFilterDisabled(label.filter)' :tooltip='label.tooltip'>
              {{ label.label }}
            </ChatFilter>
          </div>
          <div class='divider'></div>
        </template>
        <ChatDescription class='description flex-fixed' :channel='channel'
          :private-chat='privateChat'>
        </ChatDescription>
        <div class='divider'></div>
        <MessageList class='chat-messages flex-grow' :messages='messages'></MessageList>
        <div class='divider'></div>
        <Chatbox class='chatbox flex-fixed' @submit='chatboxSubmit' :identity='identity'></Chatbox>
      </div>
      <template v-if='channel'>
        <div class='divider'></div>
        <UserList class='user-list flex-fixed' :users='channel.users' :ops='channel.ops'></UserList>
      </template>
      <transition v-for='overlay in overlays' name='overlay' appear>
        <component :is='overlay' @closed='overlays.pop()'
          @channel-toggled='toggleChannel'
          @private-chat-opened='openPrivateChat'>
        </component>
      </transition>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Chatbox from './Chatbox.vue'
import MessageList from './MessageList.vue'
import ChatTab from './ChatTab.vue'
import UserList from './UserList.vue'
import CharacterMenu from './CharacterMenu.vue'
import ChatFilter from './ChatFilter.vue'
import ChatDescription from './ChatDescription.vue'

import ChannelList from './ChannelList.vue'
import CharacterBrowser from './CharacterBrowser.vue'
import StatusOverlay from './StatusOverlay.vue'
import OptionBar from './OptionBar.vue'

import {store, getters} from '../store'
import {clamp} from '../lib/util'
import {bottomScroll} from '../directives'

export default {
  components: {
    Avatar,
    Chatbox,
    MessageList,
    ChatTab,
    UserList,
    ChatFilter,
    ChatDescription,
    CharacterBrowser,
    OptionBar,
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
      return tab.messages || []
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
    filterLabels() {
      return [
        { filter: 'chat', label: 'Chat', tooltip: 'Normal Messages' },
        { filter: 'lfrp', label: 'LFRP', tooltip: 'RP Ads' },
        { filter: 'admin', label: 'Admin', tooltip: 'Red Admin Messages' },
        { filter: 'friend', label: 'Friend', tooltip: 'Friend and Bookmark Messages' },
        { filter: 'self', label: 'Self', tooltip: 'Your Messages' },
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
      for (const el of event.path) {
        if (el.dataset) {
          if (el.dataset.character) {
            store.setCharacterFocus(el.dataset.character)
            this.overlays.push(CharacterMenu)
            return
          }
          if (el.dataset.channel) {
            const id = el.dataset.channel
            if (store.isChannelJoined(id)) {
              const index = this.tabs.findIndex(tab => tab.channel && tab.channel.id === id)
              if (index > -1) this.currentTabIndex = index
            }
            else {
              store.joinChannel(id)
            }
          }
        }
      }
    },
    openPrivateChat(name) {
      store.openPrivateChat(name)
      store.setCharacterFocus(null)
      this.currentTabIndex = this.tabs.length - 1
    },
    isFilterDisabled(filter) {
      const {channel} = this.currentTab
      if (channel) {
        const modes = {
          both: false,
          ads: true,
          chat: filter === 'lfrp',
        }
        return modes[channel.mode] || false
      }
    },
    chatboxSubmit(message) {
      const {channel, privateChat} = this.currentTab
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
  background: theme-darker(50%)

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

.description
  background: theme-darker(10%)
  max-height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chatbox
  background: theme-darker(10%)
  height: 5em

.option-bar
  flex(column)
</style>
