<template>
  <div class='fullscreen bg-color'>
    <chat></chat>
    <component :is='currentOverlay'
    @login-request='loginRequest'
    @login-success='loginSuccess'
    @character-selected='characterSelected'
    @overlay-closed='closeOverlay'
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
import store from '../vuex/store'
import {userData, userChannels} from '../vuex/getters'
import SocketHandler from '../socket-handler'

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
      currentOverlay: 'login',
      socket: new SocketHandler()
    }
  },

  methods: {
    loginRequest (account) {
      store.dispatch('LOGIN_REQUEST', account)
    },

    loginSuccess (userData) {
      store.dispatch('LOGIN_SUCCESS', userData)
      this.currentOverlay = 'character-select'
    },

    characterSelected (character) {
      store.dispatch('CHARACTER_SELECTED', character)
      this.currentOverlay = ''

      this.socket.connect('main', this.userData)
      .then(() => {
        this.currentOverlay = 'channel-list'
      })
      .catch(err => {
        this.currentOverlay = ''
      })
    },

    channelListClicked ({ id, name }) {
      store.dispatch('CREATE_CHANNEL_STATE', id, name)

      this.$nextTick(() => {
        const channel = this.userChannels[id]
        if (channel.status === 'left') {
          this.socket.joinChannel(id)
        }
        else if (channel.status === 'joined') {
          this.socket.leaveChannel(id)
        }
      })
    },

    closeOverlay () {
      this.currentOverlay = ''
    }
  },

  vuex: {
    getters: {
      userData,
      userChannels
    }
  }
}
</script>
