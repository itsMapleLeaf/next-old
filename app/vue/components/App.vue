<template>
  <div class='ui-fullscreen' @mouseup="checkDataAttribute($event)">
    <chat></chat>
    <component v-for="overlay in overlays" :is='overlay'></component>
  </div>
</template>

<style lang="stylus" src="../styles/ui.styl"></style>
<style lang="stylus" src="../styles/flex.styl"></style>

<script>
import Chat from './Chat.vue'
import LoginOverlay from './LoginOverlay.vue'
import MenuOverlay from './MenuOverlay.vue'
import ChannelSelectOverlay from './ChannelSelectOverlay.vue'
import CharacterSelectOverlay from './CharacterSelectOverlay.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import OnlineUsersOverlay from './OnlineUsersOverlay.vue'
import AboutOverlay from './AboutOverlay.vue'
import CharacterActionOverlay from './CharacterActionOverlay.vue'

import socket from '../modules/socket'
import {pushOverlay, popOverlay} from '../modules/vuex/actions'
import {getStorage} from '../modules/storage'
import * as flist from '../modules/flist'

export default {
  components: {
    Chat,
    LoginOverlay,
    MenuOverlay,
    ChannelSelectOverlay,
    CharacterSelectOverlay,
    LoadingOverlay,
    OnlineUsersOverlay,
    AboutOverlay,
    CharacterActionOverlay
  },

  vuex: {
    getters: {
      overlays: state => state.ui.overlays,
      connectionState: state => state.chat.connectionState,
      account: state => state.auth.account,
      ticket: state => state.auth.ticket,
      character: state => state.user.character,
      activeChannels: state => state.chat.activeChannels
      // lastActiveChannel: state => state.chat.lastActiveChannel
    },
    actions: {
      pushOverlay,
      popOverlay,

      setAuth ({dispatch}, account, ticket) {
        dispatch('SetAuth', account, ticket)
      },

      setUserData ({dispatch}, characters, friends, bookmarks) {
        dispatch('SetUserCharacterList', characters)
        dispatch('SetFriendsList', friends)
        dispatch('SetBookmarkList', bookmarks)
      },

      setCharacterFocus ({dispatch}, name) {
        dispatch('SetFocusedCharacter', name)
      }
    }
  },

  ready () {
    if (this.connectionState === 'identified' || this.connectionState === 'online') return

    this.pushOverlay('loading-overlay')

    new Promise((resolve, reject) => {
      const data = getStorage()
      if (!data) reject('No storage data found')

      const {account, ticket} = data
      if (!account || !ticket) reject('Invalid storage data')

      this.setAuth(account, ticket)
      resolve(Promise.all([
        flist.getUserCharacters(account, ticket),
        flist.getFriendsList(account, ticket),
        flist.getBookmarkList(account, ticket)
      ]))
    }).then(([res1, res2, res3]) => {
      if (res1.error) {
        throw new Error('Error getting characters: ' + res1.error)
      }
      if (res2.error) {
        throw new Error('Error getting friends: ' + res2.error)
      }
      if (res3.error) {
        throw new Error('Error getting bookmarks: ' + res2.error)
      }

      const {characters} = res1
      const friends = res2.friends.map(entry => {
        return { you: entry.source, them: entry.dest }
      })
      const bookmarks = res3.characters

      this.setUserData(characters, friends, bookmarks)
      this.popOverlay()
      this.pushOverlay('character-select-overlay')
    }).catch(e => {
      console.warn(e)
      this.popOverlay()
      this.pushOverlay('login-overlay')
    })
  },

  methods: {
    checkDataAttribute (event) {
      for (let {name, value} of event.target.attributes) {
        switch (name) {
          case 'data-push-overlay':
            this.pushOverlay(value)
            break

          case 'data-toggle-channel':
            if (!this.activeChannels[value]) {
              socket.joinChannel(value)
            } else {
              socket.leaveChannel(value)
            }
            break

          case 'data-character-action':
            this.setCharacterFocus(value)
            this.pushOverlay('character-action-overlay')
            break
        }
      }
    }
  },

  watch: {
    connectionState (state) {
      switch (state) {
        case 'connecting':
          this.pushOverlay('loading-overlay')
          break

        case 'online':
          this.popOverlay()
          this.pushOverlay('loading-overlay')
          socket.identify(this.account, this.ticket, this.character)
          break

        case 'identified': {
          // const data = getStorage()
          // if (data) {
          //   if (Array.isArray(data[`activeChannels:${this.character}`]) && data[`activeChannels:${this.character}`].length > 0) {
          //     // TODO: uncomment this when we've found a proper way to watch for removed active channels
          //     // at the moment, the client's sending a bunch of join requests for duplicate channels,
          //     // and we might get kicked as a result
          //     // for (let id of data[`activeChannels:${this.character}`]) {
          //     //   socket.joinChannel(id)
          //     // }
          //   } else {
          //     saveStorageKeys({ [`activeChannels:${this.character}`]: [] })
          //   }

          this.popOverlay()
          this.pushOverlay('menu-overlay')
          break
        }

        case 'offline':
          break
      }
    }

    // lastActiveChannel (channel) {
    //   const data = getStorage()
    //   if (data) {
    //     if (Array.isArray(data[`activeChannels:${this.character}`])) {
    //       saveStorageKeys({ [`activeChannels:${this.character}`]: data[`activeChannels:${this.character}`].concat([ channel.id ]) })
    //     } else {
    //       saveStorageKeys({ [`activeChannels:${this.character}`]: [ channel.id ] })
    //     }
    //   }
    // }
  }
}
</script>
