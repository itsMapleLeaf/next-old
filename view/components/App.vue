<template>
  <div>
    <chat @click='activateCharacter($event)'></chat>
    <component :is='currentOverlay' :active-character='activeCharacter'>
    </component>
  </div>
</template>

<style lang="stylus">
@import '../styles/ui.styl'
@import '../styles/flex.styl'
@import '../styles/transitions.styl'
</style>

<script>
import Chat from './Chat.vue'
import Login from './Login.vue'
import CharacterList from './CharacterList.vue'
import ChannelList from './ChannelList.vue'
import AppMenu from './AppMenu.vue'
import CharacterMenu from './CharacterMenu.vue'

import state from '../lib/state'
import SocketHandler from '../lib/socket-handler'
import {ChannelStatus} from '../lib/types'
import {getUserData} from '../lib/flist'
import * as events from '../lib/events'

export default {
  components: {
    Chat,
    Login,
    CharacterList,
    ChannelList,
    AppMenu,
    CharacterMenu
  },

  data () {
    return {
      currentOverlay: '',
      activeCharacter: {},
      socket: new SocketHandler(this),
      state
    }
  },

  created () {
    // TODO: don't auth to website if we're already connected to chat
    const { account, ticket } = this.state.getUserData()
    if (ticket !== '') {
      getUserData(account, ticket)
      .then(data => {
        this.state.setUserCharacterList(data.characters)
        this.state.setFriendsList(data.friends)
        this.state.setBookmarkList(data.bookmarks)
        this.currentOverlay = 'character-list'
      })
      .catch(err => {
        this.currentOverlay = 'login'
        console.warn(err)
      })
    } else {
      this.currentOverlay = 'login'
    }
  },

  events: {
    [events.OverlayChangeRequest] (overlay) {
      this.currentOverlay = overlay
    },

    [events.CharacterSelected] (name) {
      this.state.setUserCharacter(name)
      this.currentOverlay = ''
      this.socket.connect('main')
    },

    [events.CharacterActivated] (character) {
      this.activeCharacter = this.state.getCharacter(character)
      this.currentOverlay = 'character-menu'
    },

    [events.LoginRequest] (account) {
      this.state.setAccount(account)
    },

    [events.LoginSuccess] (data) {
      this.state.setUserCharacterList(data.characters)
      this.state.setFriendsList(data.friends)
      this.state.setBookmarkList(data.bookmarks)
      this.state.setTicket(data.ticket)
      this.currentOverlay = 'character-list'
    },

    [events.ToggleChannelRequest] ({ id, name }) {
      this.state.setChannelName(id, name)
      const status = this.state.getChannelStatus(id)
      if (status === ChannelStatus.left) {
        this.socket.joinChannel(id)
      } else if (status === ChannelStatus.joined) {
        this.socket.leaveChannel(id)
      }
    },

    [events.SocketIdentifySuccess] () {
      this.socket.fetchChannelList()
      this.currentOverlay = 'channel-list'
    },

    [events.SocketError] () {
      this.currentOverlay = 'login'
    },

    [events.SocketChannelJoined] (id) {
      this.$broadcast(events.SocketChannelJoined, this.state.getChannel(id))
    },

    [events.SocketChannelLeft] (id) {
      this.$broadcast(events.SocketChannelLeft, this.state.getChannel(id))
    },

    [events.ChannelMessageSent] (id, message) {
      this.socket.sendChannelMessage(id, message)
    },

    [events.PrivateMessageSent] (character, message) {
      this.socket.sendPrivateMessage(character.name, message)
    },

    [events.PrivateMessageReceived] (name, message) {
      this.$broadcast(events.PrivateMessageReceived, name, message)
    },

    [events.OpenPrivateChatRequest] (name) {
      this.$broadcast(events.OpenPrivateChatRequest, name)
    }
  },

  methods: {
    activateCharacter (event) {
      const name = event.target.getAttribute('data-activate-character')
      if (name) {
        this.$emit(events.CharacterActivated, name)
      }
    }
  }
}
</script>
