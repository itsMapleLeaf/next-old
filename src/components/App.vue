<template>
  <div>
    <chat
    @channel-message-sent='channelMessageSent'
    @private-message-sent='privateMessageSent'>
    </chat>
    <component :is='currentOverlay'
    @login-request='loginRequest'
    @login-success='loginSuccess'
    @character-selected='characterSelected'
    @channel-list-clicked='channelListClicked'>
    </component>
  </div>
</template>

<style lang="stylus">
@import '../styles/ui.styl'
@import '../styles/flex.styl'
</style>

<script>
import Chat from './Chat.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelList from './ChannelList.vue'
import AppMenu from './AppMenu.vue'

import state from '../state'
import SocketHandler from '../socket-handler'
import {ChannelStatus} from '../types'
import {getUserData} from '../flist'

export default {
  components: {
    Chat,
    Login,
    CharacterSelect,
    ChannelList,
    AppMenu
  },

  data () {
    return {
      currentOverlay: '',
      socket: new SocketHandler(this),
      state
    }
  },

  created () {
    this.$on('overlay-change-request', this.setOverlay)

    // TODO: don't auth to website if we're already connected to chat
    const { account, ticket } = this.state.getUserData()
    if (ticket !== '') {
      getUserData(account, ticket)
      .then(data => {
        this.state.setUserCharacterList(data.characters)
        this.state.setFriendsList(data.friends)
        this.state.setBookmarkList(data.bookmarks)
        this.currentOverlay = 'character-select'
      })
      .catch(err => {
        this.currentOverlay = 'login'
        console.warn(err)
      })
    } else {
      this.currentOverlay = 'login'
    }
  },

  methods: {
    loginRequest (account) {
      this.state.setAccount(account)
    },

    loginSuccess (data) {
      this.state.setUserCharacterList(data.characters)
      this.state.setFriendsList(data.friends)
      this.state.setBookmarkList(data.bookmarks)
      this.state.setTicket(data.ticket)
      this.currentOverlay = 'character-select'
    },

    characterSelected (character) {
      this.state.setCharacter(character)
      this.currentOverlay = ''
      this.socket.connect('main')
    },

    socketIdentifySuccess () {
      this.socket.fetchChannelList()
      this.currentOverlay = 'channel-list'
    },

    socketError () {
      this.currentOverlay = 'login'
    },

    socketChannelJoined (id) {
      this.$broadcast('joined-channel', this.state.getChannel(id))
    },

    socketChannelLeft (id) {
      this.$broadcast('left-channel', this.state.getChannel(id))
    },

    channelListClicked ({ id, name }) {
      this.state.setChannelName(id, name)

      const status = this.state.getChannelStatus(id)
      if (status === ChannelStatus.left) {
        this.socket.joinChannel(id)
      } else if (status === ChannelStatus.joined) {
        this.socket.leaveChannel(id)
      }
    },

    setOverlay (overlay) {
      this.currentOverlay = overlay
    },

    channelMessageSent (id, message) {
      this.socket.sendChannelMessage(id, message)
    },

    privateMessageSent (character, message) {
      this.socket.sendPrivateMessage(character.name, message)
    },

    privateMessageReceived (character, message) {
      this.$broadcast('private-message-received', character, message)
    }
  }
}
</script>
