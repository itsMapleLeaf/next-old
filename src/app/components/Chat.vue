<template>
  <div class='chat flex-column' @click='checkData($event)'>
    <div class='flex-fixed'>
      <ChatHeader class='header' :options='headerOptions'></ChatHeader>
    </div>
    <div class='divider'></div>
    <div class='flex-grow flex-row'>
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
        <ChatDescription class='description flex-fixed'
          :channel='channel' :private-chat='privateChat'>
        </ChatDescription>
        <div class='divider'></div>
        <div class='chat-messages flex-grow' v-bottom-scroll>
          <div class='chat-message' v-for='msg in messages'>
            <Message :sender='msg.sender' :message='msg.message' :type='msg.type' :time='msg.time'>
            </Message>
          </div>
        </div>
        <div class='divider'></div>
        <div class='chatbox-container flex-fixed'>
          <Chatbox class='chatbox' :placeholder="'Chatting as ' + identity"
            @submit='chatboxSubmit'>
          </Chatbox>
          <a href='#' class='keyboard-shortcuts-link tooltip-top' :data-tooltip='keyboardShortcuts'>
            <i class='mdi mdi-keyboard'></i>
          </a>
        </div>
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
import Toggle from './Toggle.vue'
import Character from './Character.vue'
import Chatbox from './Chatbox.vue'
import Message from './Message.vue'
import ChatTab from './ChatTab.vue'
import UserList from './UserList.vue'
import ChannelList from './ChannelList.vue'
import CharacterMenu from './CharacterMenu.vue'
import Status from './Status.vue'
import ChatHeader from './ChatHeader.vue'
import ChatFilter from './ChatFilter.vue'
import ChatDescription from './ChatDescription.vue'
import OnlineCharacters from './OnlineCharacters.vue'
import StatusOverlay from './StatusOverlay.vue'

import {store, getters} from '../store'
import {clamp} from '../lib/util'
import {bottomScroll} from '../directives'

export default {
  components: {
    Toggle,
    Character,
    Chatbox,
    Message,
    ChatTab,
    UserList,
    Status,
    ChatHeader,
    ChatFilter,
    ChatDescription,
    OnlineCharacters,
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
    ...getters({ identity: 'identity', tabs: 'chatTabs' }),
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
    headerOptions() {
      const openOverlay = which => () => this.overlays.push(which)
      return [
        {
          info: 'Join a Channel',
          icon: 'forum',
          action: openOverlay(ChannelList),
        },
        {
          info: 'Browse Online Characters',
          icon: 'heart',
          action: openOverlay(OnlineCharacters),
        },
        {
          info: 'Update Your Status',
          icon: 'account-settings',
          action: openOverlay(StatusOverlay),
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
    keyboardShortcuts() {
      return `
        Ctrl + Alt + H - [sub][/sub]
        Ctrl + Alt + B - [b][/b]
        Ctrl + Alt + I - [i][/i]
        Ctrl + Alt + U - [u][/u]
      `.trim()
    },
  },
  methods: {
    setCharacterFocus: store.setCharacterFocus,
    toggleChannel(ch) {
      store.joinChannel(ch.id, ch.name)
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
        if (el.dataset && el.dataset.character) {
          store.setCharacterFocus(el.dataset.character)
          this.overlays.push(CharacterMenu)
          break
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

<style lang='stylus'>
@require 'bbc'
</style>

<style lang='stylus' scoped>
@require 'flex'
@require 'tooltip'
@require 'layout'
@require 'theme'
@require 'overlay'

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
  overflow-y: auto

.room-filters
  background: theme-darker(30%)

.filter
  margin: 0.4em 0 0.4em 0.7em

.chat-messages
  background: theme-darker(30%)
  overflow-y: auto
  min-height: 0

.chat-message
  &:nth-child(2n)
    background: theme-darker(20%)

.description
  background: theme-darker(10%)
  max-height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chatbox-container
  background: theme-darker(10%)
  height: 5em
  position: relative

.chatbox
  display: block
  size(100%)

.keyboard-shortcuts-link
  font-size: 110%
  opacity: 0.5
  padding: 0.2em

  anchor(top right)

  +animate(hover)
    opacity: 1
</style>
