<template>
  <div class='fullscreen box vertical'>
    <div class='box horizontal'>
      <a class='box center hover-darken app-menu-button' @click='setCurrentOverlay("app-menu")'>
        <i class='fa fa-bars'></i>
      </a>
      <div class='box horizontal wrap'>
        <chat-tab
          v-for='tab in tabs'
          :selected='selectedTabIndex === $index'
          @mousedown='selectedTabIndex = $index'>

          {{ tab.text }}
        </chat-tab>
      </div>
    </div>

    <chat-view>
      <div slot='header'>
        <div class='preserve-space'>{{{ tabState.description }}}</div>
      </div>

      <div slot='content'>
        <div v-for='msg in tabState.messages'>
          {{ msg.character.name }}: {{{ msg.message }}}
        </div>
      </div>

      <div slot='sidebar'>
        <div v-for='char in tabState.characters'>
          {{ char.name }}
        </div>
      </div>
    </chat-view>

    <div class='fg-color'>
      <chatbox></chatbox>
    </div>
  </div>
</template>

<script>
import Chatbox from './Chatbox.vue'
import ChatTab from './ChatTab.vue'
import ChatView from './ChatView.vue'
import {ChannelState} from '../models'
import {joinedChannels} from '../vuex/getters'
import {setCurrentOverlay} from '../vuex/actions'

export default {
  components: {
    Chatbox,
    ChatTab,
    ChatView
  },

  data () {
    return {
      selectedTabIndex: 0,
      nullState: ChannelState('null', 'null')
    }
  },

  computed: {
    tabs () {
      return this.joinedChannels.map(channel => {
        return {
          text: channel.name,
          state: channel
        }
      })
    },

    tabState () {
      return this.$get('tabs[selectedTabIndex].state') || this.nullState
    }
  },

  vuex: {
    getters: {
      joinedChannels
    },
    actions: {
      setCurrentOverlay
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-menu-button
  size: 2em
</style>
