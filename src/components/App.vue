<template>
  <div class='fullscreen bg-color'>
    <chat></chat>
    <component :is='currentOverlay'
    @login-request='loginRequest'
    @login-success='loginSuccess'
    @character-selected='characterSelected'
    @channel-list-clicked='channelListClicked'>
    </component>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelList from './ChannelList.vue'
import AppMenu from './AppMenu.vue'

import state from '../state'
import SocketHandler from '../socket-handler'
import {ChannelStatus} from '../models'

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
    this.$on('private-message-sent', this.privateMessageSent)

    const { account, ticket } = this.state.getUserData()
    if (ticket !== '') {
      const url = 'https://www.f-list.net/json/api/character-list.php'
      this.$http.post(url, { account, ticket })
      .then(res => {
        this.state.setUserCharacterList(res.data.characters)
      })
      .catch(err => console.warn(err))
    }
  },

  methods: {
    loginRequest (account) {
      this.state.setAccount(account)
    },

    loginSuccess (userData) {
      this.state.setUserData(userData)
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
      this.$broadcast('joined-channel', id)
    },

    socketChannelLeft (id) {
      this.$broadcast('left-channel', id)
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

    privateMessageSent (character, message) {
      this.socket.sendPrivateMessage(character.name, message)
    },

    privateMessageReceived (character, message) {
      this.$broadcast('private-message-received', character, message)
    },

    sendChannelMessage (message) {
      this.socket.sendChannelMessage(message)
    }
  }
}
</script>
