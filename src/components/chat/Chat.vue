<template>
  <main class="flex-row fullscreen">
    <section class="bg-color-darken-2 scroll-v">
      <a href='#' class="action-icon" @pointerdown.prevent="openChannelList">
        <i class="mdi mdi-forum"></i>
      </a>
    </section>
    <section class="bg-color-darken-1 flex-column scroll-v">
      <chat-tab v-for="({ id, title }, index) in joinedChannels" :key="id" :active="index === tabIndex" @activate="tabIndex = index">
        <i :class="'mdi mdi-' + (id === title ? 'earth' : 'key-variant')"></i>
        <span v-html="title"></span>
      </chat-tab>
    </section>
    <section class="bg-color-darken-0 flex-grow">
      <channel-view v-if="joinedChannels[tabIndex]" v-bind="joinedChannels[tabIndex]" style="width: 100%; height: 100%"></channel-view>
    </section>

    <component v-if="overlay" :is="overlay.component" v-on="overlay.events || {}" v-bind="overlay.props || {}"></component>
  </main>
</template>

<script>
import ChannelList from './ChannelList'
import ChatTab from './ChatTab'
import ChannelView from './ChannelView'

export default {
  components: {
    ChannelList,
    ChatTab,
    ChannelView,
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

    showChannel(channel) {
      // TODO
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
