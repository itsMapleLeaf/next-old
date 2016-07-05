<template>
  <div>
    <chat></chat>
    <component v-for="overlay in overlays" :is='overlay'></component>
  </div>
</template>

<style lang="stylus">
@import '../styles/root'
@import '../styles/ui'
@import '../styles/flex'
@import '../styles/transitions'
</style>

<script>
// import ChannelList from './overlays/ChannelList.vue'
// import AppMenu from './overlays/AppMenu.vue'
// import CharacterMenu from './overlays/CharacterMenu.vue'
// import OnlineUsers from './overlays/OnlineUsers.vue'
// import About from './overlays/About.vue'

import Chat from './Chat.vue'
import Login from 'view/components/overlays/Login.vue'
import CharacterList from 'view/components/overlays/CharacterList.vue'
import Loading from 'view/components/overlays/Loading.vue'

import {store} from 'modules/store'
import {socket, servers} from 'modules/socket'
// import * as flist from 'modules/flist'

export default {
  components: {
    Chat,
    Login,
    CharacterList,
    Loading

    // Chat,
    // ChannelList,
    // AppMenu,
    // CharacterMenu,
    // OnlineUsers,
    // About
  },

  data () {
    return { overlays: [], store, socket }
  },

  ready () {
    this.overlays = ['login']
  },

  methods: {
    LoginRequest () {
      this.overlays.push('loading')
    },

    LoginSuccess (event) {
      const data = event.loginData
      this.store.setAuthData(data.account, data.ticket)
      this.store.setFriendsList(data.friends)
      this.store.setUserCharacterList(data.characters)
      this.store.setBookmarkList(data.bookmarks)

      this.overlays = []
      window.setTimeout(() => {
        this.overlays = ['character-list']
      }, 500)
    },

    LoginFailure () {
      this.overlays.pop()
    },

    UserCharacterSelected (event) {
      this.store.setUserCharacter(event.name)
      this.overlays = ['loading']
      this.socket.connect(servers.main)
    },

    SocketConnectionSuccess () {
      const {account, ticket} = this.store.getAuthData()
      const character = this.store.getUserCharacterName()
      this.socket.identify(account, ticket, character)
    },

    SocketIdentifySuccess () {
      this.overlays = []
      console.log('You win!')
    }
  },

  watch: {
    'store.getEvent()' (event) {
      const method = this[event.type]
      if (method) {
        method(event)
      } else {
        console.log('Unknown event:', event.type, event)
      }
    }
  }
}
</script>
