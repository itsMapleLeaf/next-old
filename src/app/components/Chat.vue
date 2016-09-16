<template>
  <div class='chat flex-row'>
    <div class='option-bar flex-fixed flex-column'>
      <a href='#' v-for='option of sidebarOptions' class='tooltip-right'
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
          <Toggle v-for='filter of filters' class='room-filter tooltip-bottom'
            :data-tooltip='filter.info' v-model='filter.enabled'>
            {{ filter.label }}
          </Toggle>
        </div>
        <a href='#' class='room-settings-button tooltip-bottom' data-tooltip='Room Settings'>
          <i class='mdi mdi-tune'></i>
        </a>
      </div>
      <div class='divider'></div>
      <Resizable class='room-description flex-fixed' bottom>
        <span v-html='description'></span>
      </Resizable>
      <div class='divider'></div>
      <div class='chat-messages flex-grow'>
        <Message class='chat-message' v-for='msg in messages'
          :sender='msg.sender'
          :message='msg.message'>
        </Message>
      </div>
      <div class='divider'></div>
      <Resizable class='chat-input flex-fixed' top>
        <Chatbox :placeholder="'Chatting as ' + identity" />
      </Resizable>
    </div>
    <div class='divider'></div>
    <UserList class='user-list flex-fixed' :users='users' :ops='ops'></UserList>
    <transition v-for='overlay of overlays' name='fade' appear>
      <component :is='overlay' @closed="overlays.pop()" @channel-toggled="toggleChannel">
      </component>
    </transition>
  </div>
</template>

<script>
import Resizable from './Resizable.vue'
import Toggle from './Toggle.vue'
import Character from './Character.vue'
import Chatbox from './Chatbox.vue'
import ChannelList from './ChannelList.vue'
import Message from './Message.vue'
import ChatTab from './ChatTab.vue'
import UserList from './UserList.vue'

import {store, getters} from '../store'
import {clamp} from '../lib/util'

export default {
  components: {
    Resizable,
    Toggle,
    Character,
    Chatbox,
    ChannelList,
    Message,
    ChatTab,
    UserList
  },
  computed: {
    ...getters(['identity', 'chatTabs']),

    currentTab () {
      const index = clamp(this.currentTabIndex, 0, this.chatTabs.length)
      return this.chatTabs[index] || {}
    },

    messages () {
      const {channel} = this.currentTab
      return channel ? channel.messages : []
    },

    users () {
      const {channel} = this.currentTab
      return channel ? channel.users : []
    },

    description () {
      const {channel} = this.currentTab
      return channel ? channel.description : ''
    },

    ops () {
      const {channel} = this.currentTab
      return channel ? channel.ops : []
    }
  },
  data () {
    const openOverlay = which => () => this.overlays.push(which)
    return {
      currentTabIndex: 0,
      overlays: [],
      sidebarOptions: [
        { info: 'Join a Channel', icon: 'forum', action: openOverlay('ChannelList') },
        { info: 'Browse Online Characters', icon: 'heart' },
        { info: 'Update Your Status', icon: 'account-settings' },
        { info: 'Settings', icon: 'settings' }
      ],
      filters: [
        { label: 'Chat', info: 'Normal Messages', enabled: true },
        { label: 'LFRP', info: 'RP Ads', enabled: true },
        { label: 'Admin', info: 'Red Admin Messages', enabled: true },
        { label: 'Friend', info: 'Friend and Bookmark Messages', enabled: true },
        { label: 'Self', info: 'Your Messages', enabled: true }
      ]
    }
  },
  created () {
    store.connectToChatServer()
    store.fetchUserData()
  },
  methods: {
    toggleChannel (ch) {
      store.joinChannel(ch.id, ch.name)
    },
    closeTab (tab) {
      if (tab.channel) {
        store.leaveChannel(tab.channel.id)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

.flex-row
  flex(row)

.flex-column
  flex(column)

.flex-grow
  flex-grow: 1

.flex-fixed
  flex-shrink: 0

.divider
  size: 3px
  visibility: hidden
  flex-shrink: 0

.chat
  size: 100%
  background: darken($theme-color, 50%)

.option-bar
  padding: 0.3em 0
  background: darken($theme-color, 30%)

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
  background: darken($theme-color, 30%)

  .room-filter
    margin: 0.4em 0 0.4em 0.7em

  .room-settings-button
    padding: 0.3em
    font-size: 130%
    opacity: 0.5
    animate()

    &:hover
      opacity: 1

.chat-messages
  background: darken($theme-color, 30%)
  overflow-y: auto
  min-height: 0

  .chat-message
    margin: 0.3em 0.3em 0

.room-description
  background: darken($theme-color, 10%)
  height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chat-input
  background: darken($theme-color, 10%)
  height: 5em

  textarea
    display: block
    size: 100%

    &:focus
      background: darken($theme-color, 40%)
</style>
