<template>
  <div class='ui-fullscreen' @mouseup="checkDataAttribute($event)">
    <chat></chat>
    <component v-for="overlay in overlays" :is='overlay'></component>
    <div class='notice-list'>
      <notice v-for='note in notes' @click='notes.$remove(note)' transition='fade'>
        {{note.text}}
      </notice>
    </div>
  </div>
</template>

<style lang="stylus" src="../styles/ui.styl"></style>
<style lang="stylus" src="../styles/flex.styl"></style>
<style lang="stylus" src="../styles/transitions.styl"></style>

<style lang="stylus" scoped>
$spacing = 0.8em

.notice-list
  position: fixed
  right: 0
  bottom: 4em
  margin-right: $spacing

.notice-list .notice
  margin-bottom: $spacing
</style>

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
import Notice from './Notice.vue'

import socket from '../modules/socket'
import {pushOverlay, popOverlay} from '../modules/vuex/actions'
import {getStorage, saveStorageKeys} from '../modules/storage'
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
    CharacterActionOverlay,
    Notice
  },

  data () {
    return {
      initialized: false,
      notes: []
    }
  },

  vuex: {
    getters: {
      overlays: state => state.ui.overlays,
      connectionState: state => state.chat.connectionState,
      account: state => state.auth.account,
      ticket: state => state.auth.ticket,
      character: state => state.user.character,
      activeChannels: state => state.chat.activeChannels,
      newNotice: state => state.ui.newNotice,
      joinedChannel: state => state.chat.joinedChannel,
      leftChannel: state => state.chat.leftChannel
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

  created () {
    this.$nextTick(() => {
      if (this.initialized) return
      this.initialized = true

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
            if (!this.activeChannels.includes(value)) {
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
    },

    addNotice (text) {
      const note = { text }
      this.notes.push(note)
      window.setTimeout(() => {
        this.notes.$remove(note)
      }, 5000)
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
          this.popOverlay()
          const data = getStorage()
          const channels = data && data[`channels:${this.character}`]
          if (channels) {
            for (let id in channels) {
              socket.joinChannel(id)
            }
          } else {
            this.pushOverlay('menu-overlay')
          }
          break
        }

        case 'offline':
          break
      }
    },

    newNotice ({text}) {
      this.addNotice(text)
    }

    // joinedChannel ({id}) {
    //   const data = getStorage()
    //   if (data) {
    //     const channels = data[`channels:${this.character}`] || {}
    //     channels[id] = true
    //     saveStorageKeys({ [`channels:${this.character}`]: channels })
    //   }
    // },
    //
    // leftChannel ({id}) {
    //   const data = getStorage()
    //   if (data) {
    //     const channels = data[`channels:${this.character}`]
    //     delete channels[id]
    //     saveStorageKeys({ [`channels:${this.character}`]: channels })
    //   }
    // }
  }
}
</script>
