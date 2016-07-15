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
// import CharacterMenu from './overlays/CharacterMenu.vue'

import Chat from './Chat.vue'
import Login from './overlays/Login.vue'
import AppMenu from './overlays/AppMenu.vue'
import ChannelList from './overlays/ChannelList.vue'
import CharacterList from './overlays/CharacterList.vue'
import Loading from './overlays/Loading.vue'
import OnlineUsers from './overlays/OnlineUsers.vue'
import About from './overlays/About.vue'

import socket, {servers} from 'modules/socket'
import {pushOverlay, popOverlay} from '../vuex/actions'
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

  vuex: {
    getters: {
      overlays: state => state.ui.overlays,
      connectionState: state => state.chat.connectionState,
      account: state => state.auth.account,
      ticket: state => state.auth.ticket,
      character: state => state.user.character
    },
    actions: {pushOverlay, popOverlay}
  },

  ready () {
    this.pushOverlay('login')
  },

  methods: {
    checkDataAttribute (event) {
      this.checkToggleChannel(event.target)
    },

    checkToggleChannel (el) {
      const id = el.getAttribute('data-toggle-channel')
      if (id) {
        if (!store.isChannelActive(id)) {
          store.notify('JoinChannelRequest', { id })
        } else {
          store.notify('LeaveChannelRequest', { id })
        }
      }
    }
  },

  watch: {
    connectionState (state) {
      switch (state) {
        case 'connecting':
          this.pushOverlay('loading')
          break

        case 'online':
          this.popOverlay()
          this.pushOverlay('loading')
          socket.identify(this.account, this.ticket, this.character)
          break

        case 'identified':
          this.popOverlay()
          this.pushOverlay('app-menu')
          break
      }
    }
  }
}
</script>
