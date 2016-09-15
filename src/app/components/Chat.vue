<template>
  <div class='chat flex-row'>
    <div class='option-bar flex-fixed flex-column'>
      <a class='option-bar-option tooltip-right' href='#' data-tooltip='Channels'>
        <i class='mdi mdi-forum'></i>
      </a>
      <a class='option-bar-option tooltip-right' href='#' data-tooltip='Online Characters'>
        <i class='mdi mdi-account-multiple'></i>
      </a>
      <a class='option-bar-option tooltip-right' href='#' data-tooltip='Update Status'>
        <i class='mdi mdi-account-settings'></i>
      </a>
      <a class='option-bar-option tooltip-right' href='#' data-tooltip='Settings'>
        <i class='mdi mdi-settings'></i>
      </a>
    </div>
    <Resizable class='active-chat-list flex-fixed' right>
      <a class='current' href='#'>
        <i class='mdi mdi-earth'></i>
        <span>Fantasy</span>
      </a>
      <a href='#'>
        <i class='mdi mdi-earth'></i>
        <span>Story Driven RP</span>
      </a>
      <a href='#'>
        <i class='mdi mdi-earth'></i>
        <span>RP Bar</span>
      </a>
      <a href='#'>
        <i class='mdi mdi-key-variant'></i>
        <span>RP Dark City</span>
      </a>
      <a href='#'>
        <i class='mdi mdi-key-variant'></i>
        <span>Lesbians</span>
      </a>
      <a href='#'>
        <i class='mdi mdi-key-variant'></i>
        <span>Frontpage</span>
      </a>
    </Resizable>
    <div class='divider'></div>
    <div class='flex-grow flex-column'>
      <div class='room-settings flex-fixed flex-row'>
        <div class='room-filters flex-grow'>
          <Toggle class='room-filter tooltip-bottom' data-tooltip='Normal Messages'>Chat</Toggle>
          <Toggle class='room-filter tooltip-bottom' data-tooltip='RP Ads'>LFRP</Toggle>
          <Toggle class='room-filter tooltip-bottom' data-tooltip='Red Admin Messages'>Admin</Toggle>
          <Toggle class='room-filter tooltip-bottom' data-tooltip='Friend and Bookmark Messages'>Friend</Toggle>
          <Toggle class='room-filter tooltip-bottom' data-tooltip='Your Messages'>Self</Toggle>
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
        <Chatbox :placeholder="'Chatting as ' + store.identity + '.'" />
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
    <ChannelList/>
  </div>
</template>

<script>
import Resizable from './Resizable.vue'
import Toggle from './Toggle.vue'
import Character from './Character.vue'
import Chatbox from './Chatbox.vue'
import ChannelList from './ChannelList.vue'

import {store} from '../store'

export default {
  components: {
    Resizable,
    Toggle,
    Character,
    Chatbox,
    ChannelList
  },
  data () {
    return {
      store
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

.active-chat-list
  background: $theme-color
  width: 10em
  width-limit: 6em 20em

  a
    accent-border(left)
    display: block
    padding: 0.3em 0.3em
    opacity: 0.5
    animate()

    &:hover
      background: darken($theme-color, 20%)

    &.current
      background: darken($theme-color, 30%)
      opacity: 1

    &:not(.current)
      border-color: transparent

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
