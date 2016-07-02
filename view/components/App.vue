<template>
  <div @click='checkDataAttribute($event)'>
    <chat v-ref:chat></chat>
    <component v-for="overlay in overlays" :is='overlay' :active-character='activeCharacter'></component>
  </div>
</template>

<style lang="stylus">
@import '../styles/root.styl'
@import '../styles/ui.styl'
@import '../styles/flex.styl'
@import '../styles/transitions.styl'
</style>

<script>
import Chat from './Chat.vue'
import Login from './overlays/Login.vue'
import CharacterList from './overlays/CharacterList.vue'
import ChannelList from './overlays/ChannelList.vue'
import AppMenu from './overlays/AppMenu.vue'
import CharacterMenu from './overlays/CharacterMenu.vue'
import OnlineUsers from './overlays/OnlineUsers.vue'

import state from '../lib/state'
import socket from '../lib/socket'
import storage from '../lib/storage'
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
      socket, state
    }
  },

  ready () {
    this.socket.setRootVM(this)

    if (!this.socket.isConnected()) {
      this.state.loadStorageData().then(() => {
        const { account, ticket } = this.state.getAuthData()
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
      })
    }
  },

  events: {
    [events.PushOverlay] (overlay) {
      this.overlays.push(overlay)
    },

    [events.PopOverlay] () {
      this.overlays.pop()
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

    [events.CharacterSelected] (name) {
      this.state.setUserCharacter(name)
      this.socket.connect('main')
      this.$emit(events.PopOverlay)
    },

    [events.CharacterActivated] (character) {
      this.activeCharacter = this.state.getCharacter(character)
      this.$emit(events.PushOverlay, 'character-menu')
    },

    [events.ToggleChannelRequest] (id) {
      const status = this.state.getChannelStatus(id)
      if (status === ChannelStatus.left) {
        this.socket.joinChannel(id)
      } else if (status === ChannelStatus.joined) {
        this.socket.leaveChannel(id)
      }
    },

    [events.LeaveChannelRequest] (id) {
      this.socket.leaveChannel(id)
    },

    [events.SocketIdentifySuccess] () {
      this.socket.fetchChannelList()
      this.$emit(events.PushOverlay, 'app-menu')
    },

    [events.SocketChannelListReceived] (type) {
      const account = this.state.getAccount()
      const character = this.state.getUserCharacterName()

      storage.getActiveChannels(account, character).then(channels => {
        for (let id of channels[type]) {
          this.socket.joinChannel(id)
        }
      })
      .catch(msg => {
        console.log(msg)
      })
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
