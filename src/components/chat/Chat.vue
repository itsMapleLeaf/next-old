<template>
  <main class="flex-row fullscreen">
    <section class="bg-color-darken-2 scroll-v">
      <a href='#' class="action-icon" @pointerdown.prevent="openChannelList">
        <i class="mdi mdi-forum"></i>
      </a>
    </section>

    <section class="bg-color-darken-1 flex-column scroll-v">
      <chat-tab v-for="(tab, index) in tabs" :key="index" :active="index === tabIndex" @activate="tabIndex = index">
        <template v-if="tab.type === 'channel'">
          <i :class="'mdi mdi-' + (tab.channel.id === tab.channel.title ? 'earth' : 'key-variant')"></i>
          <span v-html="tab.channel.title"></span>
        </template>
        <template v-if="tab.type === 'privateChat'">
          <i class="mdi mdi-account"></i>
          <span v-html="tab.privateChat.partner"></span>
        </template>
      </chat-tab>
    </section>

    <section class="bg-color-darken-0 flex-grow">
      <template v-if="currentTab">
        <template v-if="currentTab.type === 'channel'">
          <channel-view v-bind="currentTab.channel" class="fill-area"></channel-view>
        </template>
        <template v-if="currentTab.type === 'privateChat'">
          <private-chat-view v-bind="currentTab.privateChat" class="fill-area"></private-chat-view>
        </template>
      </template>
    </section>

    <component v-if="overlay" :is="overlay.component" v-on="overlay.events || {}" v-bind="overlay.props || {}"></component>
  </main>
</template>

<script>
import ChannelList from './ChannelList'
import ChatTab from './ChatTab'
import ChannelView from './ChannelView'
import PrivateChatView from './PrivateChatView'

export default {
  components: {
    ChannelList,
    ChatTab,
    ChannelView,
    PrivateChatView,
  },
  data() {
    return {
      overlay: null,
      tabIndex: 0,
    }
  },
  computed: {
    joinedChannels() {
      const { chat } = this.$store.state
      return Object.keys(chat.joinedChannels).map(id => chat.channels[id])
    },
    privateChats() {
      const { chat } = this.$store.state
      return Object.values(chat.privateChats)
    },
    tabs() {
      const channelTabs = this.joinedChannels.map(channel => {
        return { type: 'channel', channel }
      })

      const privateChatTabs = this.privateChats.map(privateChat => {
        return { type: 'privateChat', privateChat }
      })

      return channelTabs.concat(privateChatTabs)
    },
    currentTab() {
      return this.tabs[this.tabIndex]
    }
  },
  created() {
    this.createViews()
  },
  methods: {
    createViews() {
      this.channelListView = {
        component: ChannelList,
        events: {
          close: this.closeOverlay,
        },
      }
    },

    openOverlay(overlay) {
      this.overlay = overlay
    },

    closeOverlay() {
      this.overlay = null
    },

    openChannelList() {
      this.openOverlay(this.channelListView)
      this.$store.dispatch('fetchChannelList')
    },
  },
}
</script>

<style lang="scss" scoped>
.action-icon {
  font-size: 200%;
  margin: 0.5rem;
  display: block;
  opacity: 0.5;

  &:hover {
    opacity: 0.75;
  }
}
</style>
