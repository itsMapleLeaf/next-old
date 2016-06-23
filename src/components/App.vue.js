
import Chat from './Chat.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelList from './ChannelList.vue'
import AppMenu from './AppMenu.vue'
import store from '../vuex/store'
import {userData, userChannels} from '../vuex/getters'
import SocketHandler from '../socket-handler'

const template = `
  <div class='fullscreen bg-color'>
    <chat></chat>
    <component :is='currentOverlay'
    @login-request='loginRequest'
    @login-success='loginSuccess'
    @character-selected='characterSelected'
    @channel-list-clicked='channelListClicked'>
    </component>
  </div>
`

export default {
  template,

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

  created () {
    this.socket.callbacks.channelJoined = (id) => {
      this.$broadcast('channel-joined', this.userChannels[id])
    }

    this.socket.callbacks.privateMessageReceived = (charname, message) => {
      this.$broadcast('private-message-received', charname, message)
    }

    this.$on('overlay-change-request', this.setOverlay)
    this.$on('private-message-sent', this.privateMessageSent)
    // this.$on('channel-message', this.sendChannelMessage)
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
        } else if (channel.status === 'joined') {
          this.socket.leaveChannel(id)
          this.$broadcast('left-channel', id)
        }
      })
    },

    setOverlay (overlay) {
      this.currentOverlay = overlay
    },

    privateMessageSent (character, message) {
      this.socket.sendPrivateMessage(character.name, message)
    },

    sendChannelMessage (message) {
      // this.socket.sendChannelMessage(message)
    }
  },

  vuex: {
    getters: {
      userData,
      userChannels
    }
  }
}
