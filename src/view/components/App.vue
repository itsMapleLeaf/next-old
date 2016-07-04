<template>
  <div>
    <chat></chat>
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
import About from './overlays/About.vue'

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
    OnlineUsers,
    About
  },

  data () {
    return {
      overlays: [],
      activeCharacter: {},
      socket,
      state,
      storage
    }
  },

  ready () {
    this.socket.setRootVM(this)
    if (!this.socket.isConnected()) {
      this.authenticate()
    }
  },

  events: {
    [events.PushOverlay] (overlay) {
      this.overlays.push(overlay)
    },

    [events.PopOverlay] () {
      this.overlays.pop()
    },

    [events.LoginSuccess] (data, remember) {
      const {account, ticket, characters, friends, bookmarks} = data
      this.state.setAccount(account)
      this.state.setTicket(ticket)
      this.state.setUserCharacterList(characters)
      this.state.setFriendsList(friends)
      this.state.setBookmarkList(bookmarks)

      if (remember) {
        this.storage.setAccount(account)
        this.storage.setTicket(account, ticket)
      } else {
        this.storage.setAccount(undefined)
        this.storage.setTicket(account, undefined)
      }

      this.$emit(events.PopOverlay)
      this.$emit(events.PushOverlay, 'character-list')
    },

    [events.LogoutRequest] () {
      this.$broadcast(events.ChatStateReset)
      this.socket.disconnect()
      this.state.clearChannels()
      this.overlays = ['login']
    },

    [events.SwitchCharacterRequest] () {
      this.$broadcast(events.ChatStateReset)
      this.socket.disconnect()
      this.state.clearChannels()
      this.overlays = ['character-list']
    },

    [events.CharacterSelected] (name) {
      this.state.setUserCharacter(name)
      this.storage.setCharacter(this.state.getAccount(), name)
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

      const account = this.state.getAccount()
      const character = this.state.getUserCharacterName()

      this.storage.getActiveChannels(account, character).then(channels => {
        for (let info of channels) {
          this.socket.joinChannel(info.id)
          this.state.createChannelState(info.id, info.name, info.type)
        }
        this.storage.clearActiveChannels(account, character)
      })
      .catch(msg => {
        console.warn(`Error joining active channels: ${msg}`)
      })
    },

    [events.SocketError] () {
      this.$emit(events.PushOverlay, 'login')
    },

    [events.SocketChannelJoined] (id) {
      const channel = this.state.getChannel(id)
      this.$broadcast(events.SocketChannelJoined, channel)
      this.storage.addActiveChannel(this.state.getAccount(), this.state.getUserCharacterName(), id, channel.name, channel.type)
    },

    [events.SocketChannelLeft] (id) {
      this.$broadcast(events.SocketChannelLeft, this.state.getChannel(id))
      this.storage.removeActiveChannel(this.state.getAccount(), this.state.getUserCharacterName(), id)
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
    },

    [events.StatusChange] (status, message) {
      this.socket.setStatus(status, message)
      this.state.setUserStatus(status, message)
    }
  },

  methods: {
    authenticate () {
      this.loadStorageData().then(data => {
        this.state.setAccount(data.account)
        this.state.setTicket(data.ticket)
        this.state.setUserCharacter(data.character)
        return getUserData(data.account, data.ticket)
      })
      .then(data => {
        this.state.setUserCharacterList(data.characters)
        this.state.setFriendsList(data.friends)
        this.state.setBookmarkList(data.bookmarks)
        this.$emit(events.PushOverlay, 'character-list')
      })
      .catch(msg => {
        console.log(msg)
        this.$emit(events.PushOverlay, 'login')
      })
    },

    loadStorageData () {
      const data = {}
      return this.storage.getAccount().then(account => {
        data.account = account
        return this.storage.getTicket(data.account)
      })
      .then(ticket => {
        data.ticket = ticket
        return this.storage.getCharacter(data.account)
      })
      .then(character => {
        data.character = character
        return Promise.resolve(data)
      })
      .catch(msg => {
        window.localStorage.clear()
        return Promise.reject("Couldn't load user data from storage. Starting fresh.")
      })
    }
  }
}
</script>
