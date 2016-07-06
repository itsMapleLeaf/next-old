<template>
  <main @mouseup="checkDataAttribute($event)">
    <chat></chat>
    <component v-for="overlay in overlays" :is='overlay'></component>
  </main>
</template>

<style lang="stylus">
@import '../styles/root'
@import '../styles/ui'
@import '../styles/flex'
@import '../styles/transitions'
</style>

<script>
// import CharacterMenu from './overlays/CharacterMenu.vue'

import Chat from './Chat.vue'
import Login from './overlays/Login.vue'
import AppMenu from './overlays/AppMenu.vue'
import ChannelList from './overlays/ChannelList.vue'
import CharacterList from './overlays/CharacterList.vue'
import Loading from './overlays/Loading.vue'
import OnlineUsers from './overlays/OnlineUsers.vue'
import About from './overlays/About.vue'

import {store} from 'modules/store'
import {socket, servers} from 'modules/socket'
// import * as flist from 'modules/flist'

export default {
  components: {
    Chat,
    Login,
    CharacterList,
    AppMenu,
    ChannelList,
    OnlineUsers,
    About,
    Loading
    // CharacterMenu,
  },

  data () {
    return {
      overlays: [],
      state: store.state
    }
  },

  created () {
    store.subscribe(event => {
      const method = this[event.type]
      if (method) {
        method(event)
      } else {
        console.warn('Unknown event:', event.type, event)
      }
    })
  },

  ready () {
    this.overlays = ['login']
  },

  methods: {
    checkDataAttribute (event) {
      this.checkToggleChannel(event.target)
    },

    checkToggleChannel (el) {
      const id = el.getAttribute('data-toggle-channel')
      if (id) {
        if (!store.isChannelActive(id)) {
          socket.joinChannel(id)
        } else {
          socket.leaveChannel(id)
        }
      }
    },

    // event callbacks
    LoginRequest () {
      this.overlays.push('loading')
    },

    LoginSuccess (event) {
      // unpack / dispatch store data
      const {account, ticket, characters, friends, bookmarks} = event.loginData
      store.dispatch({ type: 'Auth', account, ticket })
      store.dispatch({ type: 'FriendsList', friends })
      store.dispatch({ type: 'UserCharacterList', characters })
      store.dispatch({ type: 'BookmarkList', bookmarks })

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
      store.dispatch({ type: 'UserCharacter', name })
      this.overlays = ['loading']
      socket.connect(servers.main)
    },

    SocketConnectionSuccess () {
      const {account, ticket} = store.getAuthData()
      const character = store.getUserCharacterName()
      socket.identify(account, ticket, character)
    },

    SocketIdentifySuccess () {
      this.overlays = ['app-menu']
    },

    PushOverlay ({ overlay }) {
      this.overlays.push(overlay)
    },

    PopOverlay () {
      this.overlays.pop()
    },

    DisconnectRequest () {
      socket.disconnect()
    }
  }
}
</script>
