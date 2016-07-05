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
// import CharacterMenu from './overlays/CharacterMenu.vue'
// import OnlineUsers from './overlays/OnlineUsers.vue'
// import About from './overlays/About.vue'

import Chat from './Chat.vue'
import Login from './overlays/Login.vue'
import CharacterList from './overlays/CharacterList.vue'
import Loading from './overlays/Loading.vue'
import AppMenu from './overlays/AppMenu.vue'

import {store} from 'modules/store'
import {socket, servers} from 'modules/socket'
// import * as flist from 'modules/flist'

export default {
  components: {
    Chat,
    Login,
    CharacterList,
    AppMenu,
    Loading

    // Chat,
    // ChannelList,
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
      // unpack / dispatch store data
      const {account, ticket, characters, friends, bookmarks} = event.loginData
      this.store.dispatch({ type: 'Auth', account, ticket })
      this.store.dispatch({ type: 'FriendsList', friends })
      this.store.dispatch({ type: 'UserCharacterList', characters })
      this.store.dispatch({ type: 'BookmarkList', bookmarks })

      // delay the overlay change, so it's a little nicer on the eyes and not too quick
      this.overlays = []
      window.setTimeout(() => {
        this.overlays = ['character-list']
      }, 500)
    },

    LoginFailure () {
      // rip :(
      this.overlays = ['login']
    },

    UserCharacterSelected ({ name }) {
      this.store.dispatch({ type: 'UserCharacter', name })
      this.overlays = ['loading']
      this.socket.connect(servers.main)
    },

    SocketConnectionSuccess () {
      const {account, ticket} = this.store.getAuthData()
      const character = this.store.getUserCharacterName()
      this.socket.identify(account, ticket, character)
    },

    SocketIdentifySuccess () {
      this.overlays = ['app-menu']
    },

    PushOverlay (overlay) {
      this.overlays.push(overlay)
    },

    PopOverlay () {
      this.overlays.pop()
    }
  },

  watch: {
    'store.state.event' (event) {
      const method = this[event.type]
      if (method) {
        method(event)
      } else {
        console.warn('Unknown event:', event.type, event)
      }
    }
  }
}
</script>
