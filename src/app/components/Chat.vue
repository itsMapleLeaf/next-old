<template>
  <div class='chat flex-column' @click='checkData($event)'>
    <div class='flex-fixed'>
      <ChatHeader class='header' :options='headerOptions'></ChatHeader>
    </div>
    <div class='divider'></div>
    <div class='flex-grow flex-row'>
      <Resizable right class='chat-tabs flex-fixed'>
        <ChatTab v-for='(tab, index) in chatTabs' :tab='tab' :active='tab === currentTab'
          @selected='currentTabIndex = index' @closed='closeTab(tab)'>
        </ChatTab>
      </Resizable>
      <div class='divider'></div>
      <div class='flex-grow flex-column'>
        <template v-if='isChannel'>
          <div class='room-filters flex-fixed'>
            <ChatFilter class='filter' v-for='label in filterLabels' v-model='filters[label.filter]'
              :disabled="isFilterDisabled(label.filter)" :tooltip='label.tooltip'>
              {{ label.label }}
            </ChatFilter>
          </div>
          <div class='divider'></div>
        </template>
        <div class='room-description flex-fixed'>
          <ChatDescription :channel='currentTab.channel' :private-chat='currentTab.privateChat'>
          </ChatDescription>
        </div>
        <div class='divider'></div>
        <div class='chat-messages flex-grow' v-bottom-scroll>
          <div class='chat-message' v-for='msg in channelMessages'>
            <Message :sender='msg.sender' :message='msg.message' :type='msg.type' :time='msg.time'>
            </Message>
          </div>
        </div>
        <div class='divider'></div>
        <Resizable class='chat-input flex-fixed' top>
          <Chatbox :placeholder="'Chatting as ' + identity"></Chatbox>
        </Resizable>
      </div>
      <template v-if='isChannel'>
        <div class='divider'></div>
        <UserList class='user-list flex-fixed' :users='channelUsers' :ops='channelOps'></UserList>
      </template>
      <transition v-for='overlay in overlays' name='fade' appear>
        <component :is='overlay' @closed='overlays.pop()'
          @channel-toggled='toggleChannel'
          @private-chat-opened='openPrivateChat'>
        </component>
      </transition>
    </div>
  </div>
</template>

<script>
import Resizable from './Resizable.vue'
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

import {store, getters} from '../store'
import {clamp} from '../lib/util'
import {parse} from '../lib/bbc'
import {bottomScroll} from '../directives'

export default {
  components: {
    Resizable,
    Toggle,
    Character,
    Chatbox,
    Message,
    ChatTab,
    UserList,
    Status,
    ChatHeader,
    ChatFilter,
    ChatDescription
  },
  directives: {
    bottomScroll
  },
  data () {
    return {
      currentTabIndex: 0,
      overlays: [],
      filters: {
        chat: true,
        lfrp: true,
        admin: true,
        friend: true,
        self: true
      }
    }
  },
  computed: {
    ...getters(['identity', 'chatTabs', 'characterMenuFocus']),
    isChannel () {
      return this.currentTab.channel != null
    },
    isPrivateChat () {
      return this.currentTab.privateChat != null
    },
    currentTab () {
      const index = clamp(this.currentTabIndex, 0, this.chatTabs.length - 1)
      return this.chatTabs[index] || {}
    },
    channelMessages () {
      const {channel} = this.currentTab
      return channel ? channel.messages : []
    },
    channelUsers () {
      const {channel} = this.currentTab
      return channel ? channel.users : []
    },
    channelDescription () {
      const {channel} = this.currentTab
      return channel ? parse(channel.description) : ''
    },
    channelOps () {
      const {channel} = this.currentTab
      return channel ? channel.ops : []
    },
    channelMode () {
      const {channel} = this.currentTab
      return channel && channel.mode
    },
    partner () {
      const {privateChat} = this.currentTab
      return privateChat && privateChat.partner
    },
    headerOptions () {
      const openOverlay = which => () => this.overlays.push(which)
      return [
        { info: 'Join a Channel', icon: 'forum', action: openOverlay(ChannelList) },
        { info: 'Browse Online Characters', icon: 'heart' },
        { info: 'Update Your Status', icon: 'account-settings' },
        { info: 'Settings', icon: 'settings' }
      ]
    },
    filterLabels () {
      return [
        { filter: 'chat', label: 'Chat', tooltip: 'Normal Messages' },
        { filter: 'lfrp', label: 'LFRP', tooltip: 'RP Ads' },
        { filter: 'admin', label: 'Admin', tooltip: 'Red Admin Messages' },
        { filter: 'friend', label: 'Friend', tooltip: 'Friend and Bookmark Messages' },
        { filter: 'self', label: 'Self', tooltip: 'Your Messages' }
      ]
    }
  },
  methods: {
    setCharacterFocus: store.setCharacterFocus,
    toggleChannel (ch) {
      store.joinChannel(ch.id, ch.name)
    },
    closeTab (tab) {
      if (tab.channel) {
        store.leaveChannel(tab.channel.id)
      } else if (tab.privateChat) {
        store.closePrivateChat(tab.privateChat.partner.name)
      }
    },
    checkData (event) {
      for (const el of event.path) {
        if (el.dataset && el.dataset.character) {
          store.setCharacterFocus(el.dataset.character)
          this.overlays.push(CharacterMenu)
          break
        }
      }
    },
    openPrivateChat (name) {
      store.openPrivateChat(name)
      store.setCharacterFocus(null)
      this.currentTabIndex = this.chatTabs.length - 1
    },
    isFilterDisabled (filter) {
      const {channel} = this.currentTab
      if (channel) {
        switch (channel.mode) {
          case 'both': return false
          case 'ads': return true
          case 'chat': return filter === 'lfrp'
        }
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@require 'elements/flex'
@require 'elements/tooltip'
@require 'mixins/layout'
@require 'mixins/theme'
@require 'mixins/flex'
@require 'transitions/fade'

.divider
  size: 3px
  visibility: hidden
  flex-shrink: 0

.chat
  fullscreen()
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

.room-description
  background: theme-darker(10%)
  max-height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chat-input
  background: theme-darker(10%)
  height: 5em

  textarea
    display: block
    size: 100%
</style>
