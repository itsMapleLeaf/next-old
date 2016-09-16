<template>
  <div class='chat flex-row'>
    <div class='option-bar flex-fixed flex-column'>
      <a href='#' v-for='option of sidebarOptions' class='tooltip-right'
        :data-tooltip='option.info' @click='option.action && option.action()'>
        <i :class="'mdi mdi-' + option.icon"></i>
      </a>
    </div>
    <Resizable right class='channel-list flex-fixed'>
      <a href='#' v-for='(tab, index) of chatTabs' class='channel-list-joined'
        :class="{ 'channel-list-current': index === currentTab }" @click='currentTab = index'>
        <span v-if="tab.type === 'channel'">
          <i class='mdi mdi-earth' v-if='tab.channel.name === tab.channel.id'></i>
          <i class='mdi mdi-key-variant' v-else></i>
          <span>{{ tab.channel.id }}</span>
        </span>
      </a>
      <!-- <a class='channel-list-joined channel-list-current' href='#'>
        <i class='mdi mdi-earth'></i>
        <span>Fantasy</span>
      </a>
      <a class='channel-list-joined' href='#'>
        <i class='mdi mdi-earth'></i>
        <span>Story Driven RP</span>
      </a> -->
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Resizable>
      <div class='divider'></div>
      <div class='chat-messages flex-grow'>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='Male' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='Female' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='Transgender' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='Herm' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='Shemale' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='Male-herm' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
        <div class='message'>
          <div class='sender'>
            <Character class='user' name='AwesomeCharacter' gender='None' />
          </div>
          <div class='message-text'>This is a chat message.</div>
        </div>
      </div>
      <div class='divider'></div>
      <Resizable class='chat-input flex-fixed' top>
        <Chatbox :placeholder="'Chatting as ' + identity" />
      </Resizable>
    </div>
    <div class='divider'></div>
    <Resizable class='user-list flex-fixed' left>
      <div class='user-count'>Users: 420</div>
      <Character class='user' name='AwesomeCharacter' gender='Male' />
      <Character class='user' name='AwesomeCharacter' gender='Female' />
      <Character class='user' name='AwesomeCharacter' gender='Transgender' />
      <Character class='user' name='AwesomeCharacter' gender='Herm' />
      <Character class='user' name='AwesomeCharacter' gender='Shemale' />
      <Character class='user' name='AwesomeCharacter' gender='Male-herm' />
      <Character class='user' name='AwesomeCharacter' gender='None' />
    </Resizable>
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

import {store, getters} from '../store'

export default {
  components: {
    Resizable,
    Toggle,
    Character,
    Chatbox,
    ChannelList
  },
  computed: {
    ...getters(['identity', 'chatTabs'])
  },
  data () {
    const openOverlay = which => () => this.overlays.push(which)
    return {
      currentTab: 0,
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
  },
  methods: {
    toggleChannel (ch) {
      store.joinChannel(ch)
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

.channel-list
  background: $theme-color
  width: 12em
  width-limit: 6em 20em
  overflow-y: auto

  a
    display: block
    padding: 0.3em 0.3em
    opacity: 0.3
    animate()
    accent-border(left)

    &:hover
      background: darken($theme-color, 20%)

  :not(.channel-list-current)
    border-color: transparent

  .channel-list-joined
    opacity: 0.5

  .channel-list-current
    background: darken($theme-color, 30%)
    opacity: 1

.user-list
  background: $theme-color
  width: 12em
  width-limit: 6em 20em

  .user-count
    background: darken($theme-color, 20%)
    padding: 0.3em 0.6em

  .user
    display: block
    margin: 0.3em 0.3em 0

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

  .message
    margin: 0.3em 0.3em 0

    .sender
      display: inline-block
      margin-right: 0.5em

    .message-text
      display: inline-block

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
