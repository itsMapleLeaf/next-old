<template>
  <div class='chat flex-row' @click='checkData($event)'>
    <div class='option-bar flex-fixed flex-column'>
      <a href='#' v-for='option in sidebarOptions' class='tooltip-right'
        :data-tooltip='option.info' @click='option.action && option.action()'>
        <i :class="'mdi mdi-' + option.icon"></i>
      </a>
    </div>
    <Resizable right class='chat-tabs flex-fixed'>
      <ChatTab v-for='(tab, index) in chatTabs' :tab='tab' :active='tab === currentTab'
        @selected='currentTabIndex = index' @closed='closeTab(tab)'>
      </ChatTab>
    </Resizable>
    <div class='divider'></div>
    <div class='flex-grow flex-column'>
      <div class='room-settings flex-fixed flex-row'>
        <div class='room-filters flex-grow'>
          <Toggle v-for='label in filterLabels' class='room-filter tooltip-bottom'
            :data-tooltip='label.info' v-model='filters[label.filter]'>
            {{ label.label }}
          </Toggle>
        </div>
        <a href='#' class='room-settings-button tooltip-bottom' data-tooltip='Room Settings'>
          <i class='mdi mdi-tune'></i>
        </a>
      </div>
      <div class='divider'></div>
      <Resizable class='room-description flex-fixed' bottom>
        <span v-html='channelDescription'></span>
      </Resizable>
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
    <div class='divider'></div>
    <UserList class='user-list flex-fixed' :users='channelUsers' :ops='channelOps'></UserList>
    <transition v-for='overlay in overlays' name='fade' appear>
      <component :is='overlay' @closed='overlays.pop()'
        @channel-toggled='toggleChannel'
        @private-chat-opened='openPrivateChat'>
      </component>
    </transition>
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
    UserList
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
    sidebarOptions () {
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
        { label: 'Chat', info: 'Normal Messages', filter: 'chat' },
        { label: 'LFRP', info: 'RP Ads', filter: 'lfrp' },
        { label: 'Admin', info: 'Red Admin Messages', filter: 'admin' },
        { label: 'Friend', info: 'Friend and Bookmark Messages', filter: 'friend' },
        { label: 'Self', info: 'Your Messages', filter: 'self' }
      ]
    }
  },
  methods: {
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
    setCharacterFocus: store.setCharacterFocus
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
  size: 100%
  background: theme-darker(50%)

.option-bar
  padding: 0.3em 0
  background: theme-darker(30%)

  a
    active-animation()
    font-size: 130%
    padding: 0.4em 0.5em

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

.room-settings
  flex-align(center)
  background: theme-darker(30%)

  .room-filter
    margin: 0.4em 0 0.4em 0.7em

  .room-settings-button
    padding: 0.3em
    font-size: 130%
    opacity: 0.5
    +animate(hover)
      opacity: 1

.chat-messages
  background: theme-darker(30%)
  overflow-y: auto
  min-height: 0

  .chat-message
    &:nth-child(2n)
      background: theme-darker(20%)

.room-description
  background: theme-darker(10%)
  height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chat-input
  background: theme-darker(10%)
  height: 5em

  textarea
    display: block
    size: 100%

    &:focus
      background: theme-darker(40%)
</style>
