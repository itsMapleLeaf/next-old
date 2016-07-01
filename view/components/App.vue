<template>
  <div @click='checkDataAttribute($event)'>
    <chat></chat>
    <component v-for="overlay in overlays" :is='overlay' :active-character='activeCharacter'></component>
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
import OnlineUsers from './OnlineUsers.vue'

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
    CharacterMenu,
    OnlineUsers
  },

  data () {
    return {
      overlays: [],
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
        this.$emit(events.PushOverlay, 'character-list')
      })
      .catch(err => {
        this.$emit(events.PushOverlay, 'login')
        console.warn(err)
      })
    } else {
      this.$emit(events.PushOverlay, 'login')
    }
  },

  events: {
    [events.OverlayChangeRequest] (overlay) {
      console.error('warning: OverlayChangeRequest event is deprecated')
      if (overlay === '') {
        this.overlays.pop()
      } else {
        this.overlays.push(overlay)
      }
    },

    [events.PushOverlay] (overlay) {
      this.overlays.push(overlay)
    },

    [events.PopOverlay] () {
      this.overlays.pop()
    },

    [events.CharacterSelected] (name) {
      this.state.setUserCharacter(name)
      this.socket.connect('main')
      this.$emit(events.PopOverlay)
    },

    [events.CharacterActivated] (character) {
      this.activeCharacter = this.state.getCharacter(character)
      this.$emit(events.PushOverlay, 'character-menu')
    },

    [events.LoginRequest] (account) {
      this.state.setAccount(account)
    },

    [events.LoginSuccess] (data) {
      this.state.setUserCharacterList(data.characters)
      this.state.setFriendsList(data.friends)
      this.state.setBookmarkList(data.bookmarks)
      this.state.setTicket(data.ticket)
      this.$emit(events.PopOverlay)
      this.$emit(events.PushOverlay, 'character-list')
    },

    [events.ToggleChannelRequest] (id) {
      const status = this.state.getChannelStatus(id)
      if (status === ChannelStatus.left) {
        this.socket.joinChannel(id)
      } else if (status === ChannelStatus.joined) {
        this.socket.leaveChannel(id)
      }
    },

    [events.SocketIdentifySuccess] () {
      this.socket.fetchChannelList()
      this.$emit(events.PushOverlay, 'channel-list')
    },

    [events.SocketError] () {
      this.$emit(events.PushOverlay, 'login')
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
    checkDataAttribute (event) {
      const name = event.target.getAttribute('data-activate-character')
      if (name) {
        this.$emit(events.CharacterActivated, name)
      }

      const channelToggle = event.target.getAttribute('data-toggle-channel')
      if (channelToggle) {
        this.$emit(events.ToggleChannelRequest, channelToggle)
      }
    }
  }
}
</script>
