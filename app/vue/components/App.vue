<template>
  <div class='ui-fullscreen' @mouseup="checkDataAttribute($event)">
    <chat></chat>
    <component v-for="overlay in overlays" :is='overlay'></component>
  </div>
</template>

<style lang="stylus" src="../styles/ui.styl"></style>
<style lang="stylus" src="../styles/flex.styl"></style>

<!-- <style lang="stylus" src="./styles/App.styl"></style>
<style lang="stylus" src="./styles/App-common.styl"></style>
<style lang="stylus" src="./styles/App-ui.styl"></style>
<style lang="stylus" src="./styles/App-flex.styl"></style>
<style lang="stylus" src="./styles/App-form.styl"></style>
<style lang="stylus" src="./styles/App-transitions.styl"></style> -->

<script>
// import CharacterMenu from './CharacterMenu.vue'

import Chat from './Chat.vue'
import LoginOverlay from './LoginOverlay.vue'
import MenuOverlay from './MenuOverlay.vue'
import ChannelSelectOverlay from './ChannelSelectOverlay.vue'
import CharacterSelectOverlay from './CharacterSelectOverlay.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import OnlineUsersOverlay from './OnlineUsersOverlay.vue'
import AboutOverlay from './AboutOverlay.vue'

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
    AboutOverlay
    // CharacterMenu,
  },

  vuex: {
    getters: {
      overlays: state => state.ui.overlays,
      connectionState: state => state.chat.connectionState,
      account: state => state.auth.account,
      ticket: state => state.auth.ticket,
      character: state => state.user.character
    },
    actions: {
      pushOverlay,
      popOverlay,
      setAuth (store, account, ticket) {
        store.dispatch('SetAuth', account, ticket)
      },

      setUserData (store, characters, friends, bookmarks) {
        store.dispatch('SetUserCharacterList', characters)
        store.dispatch('SetFriendsList', friends)
        store.dispatch('SetBookmarkList', bookmarks)
      }
    }
  },

  ready () {
    if (this.connectionState === 'identified' || this.connectionState === 'online') return

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
      this.pushOverlay('character-select-overlay')
    }).catch(e => {
      console.info(e)
      this.pushOverlay('login-overlay')
    })
  },

  methods: {
    checkDataAttribute (event) {
      for (let {name, value} of event.target.attributes) {
        console.log(name, value)
        switch (name) {
          case 'data-push-overlay':
            this.pushOverlay(value)
            break
        }
      }
    },

    dataToggleChannel (el) {
      // const id = el.getAttribute('data-toggle-channel')
      // if (id) {
      //   if (!store.isChannelActive(id)) {
      //     store.notify('JoinChannelRequest', { id })
      //   } else {
      //     store.notify('LeaveChannelRequest', { id })
      //   }
      // }
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

        case 'identified':
          this.popOverlay()
          this.pushOverlay('menu-overlay')
          break

        case 'offline':
          this.pushOverlay('login-overlay')
          break
      }
    }
  }
}
</script>
