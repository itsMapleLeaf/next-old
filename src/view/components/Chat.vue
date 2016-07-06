<template>
  <div class='flex col ui theme-color dark fullscreen'>
    <div class='flex row fixed' style='flex-wrap: wrap'>
      <shortcut title="Actions" icon="bars" overlay="app-menu"></shortcut>
      <shortcut title="Channels" icon="globe" overlay="channel-list"></shortcut>
      <shortcut title="Users" icon="heart" overlay="online-users"></shortcut>

      <!-- <chat-tab v-for='tab in tabs'
      :active='activeTabIndex === $index'
      :title='tab.title'
      @closed='closeTab(tab)'
      @selected='activeTabIndex = $index'>
        {{ tab.title }}
      </chat-tab> -->
    </div>

    <!-- <component :is="currentTab.view" :view-state="currentTab.state">
    </component> -->
  </div>
</template>

<style lang="stylus" scoped>
.header-shortcut
  width: 2em
  height: @width
</style>

<script>
// import ChatTab from './elements/ChatTab.vue'
// import ChannelView from './chat-views/ChannelView.vue'
// import PrivateChatView from './chat-views/PrivateChatView.vue'

import {store} from 'modules/store'

const Shortcut = {
  template: `
    <a class='ui hover-darken flex fixed center-content header-shortcut'
      title="Actions"
      @click="pushOverlay">
      <i class='fa fa-{{icon}}'></i>
    </a>
  `,

  data () {
    return { store }
  },

  props: {
    icon: String,
    overlay: String
  },

  methods: {
    pushOverlay () {
      this.store.notify('PushOverlay', { overlay: this.overlay })
    }
  }
}

export default {
  components: {
    // ChatTab,
    // ChannelView,
    // PrivateChatView,
    Shortcut
  }
}
</script>

<style lang="stylus" scoped>
/*@import '../styles/mixins'

.app-menu-button
  size: 2em*/
</style>
