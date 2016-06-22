<template>
  <div class='fullscreen box vertical'>
    <div class='box horizontal'>
      <a class='box center hover-darken app-menu-button'
      @click="$dispatch('overlay-change-request', 'app-menu')">
        <i class='fa fa-bars'></i>
      </a>
      <div class='box horizontal wrap'>
        <chat-tab v-for='tab in tabs'
        :selected='selectedTabIndex === $index'
        @mousedown='selectedTabIndex = $index'>
          {{ tab.title }}
        </chat-tab>
      </div>
    </div>

    <component :is="currentTab.view"
    :view-state="currentTab.state"></component>
  </div>
</template>

<script>
import ChatTab from './ChatTab.vue'
import ChannelView from './ChannelView.vue'
import {userChannels} from '../vuex/getters'
import {ChannelState} from '../models'

const nullTab = { text: 'null tab', view: '' }

export default {
  components: {
    ChatTab,
    ChannelView
  },

  data () {
    return {
      tabs: [],
      selectedTabIndex: 0
    }
  },

  computed: {
    currentTab () {
      this.selectedTabIndex = Math.min(Math.max(this.selectedTabIndex, 0), this.tabs.length - 1)
      const current = this.tabs[this.selectedTabIndex]
      return current || nullTab
    }
  },

  methods: {
    joinedChannel (channel) {
      const tabState = {
        view: 'channel-view',
        title: channel.name,
        state: channel
      }
      this.tabs.push(tabState)
    },

    leftChannel (channel) {
      this.tabs = this.tabs.filter(tab => {
        if (tab.view === 'channel-view' && tab.state.id === channel.id) {
          return false
        }
        return true
      })
    },

    messageSent () {}
  },

  ready () {
    this.$on('joined-channel', this.joinedChannel)
    this.$on('left-channel', this.leftChannel)
  },

  vuex: {
    getters: {
      userChannels
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/mixins'

.app-menu-button
  size: 2em
</style>
