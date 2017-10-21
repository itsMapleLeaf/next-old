<template>
  <main class="grid fullscreen bg-color-darken-2">
    <section class="actions bg-color-darken-2 scroll-v">
      <chat-action icon='forum' @click.native.prevent="openChannelList"></chat-action>
      <chat-action icon='account-multiple' @click.native.prevent="openCharacterBrowser"></chat-action>
    </section>

    <section class="tabs bg-color-darken-1 flex-column scroll-v">
      <channel-tab
        v-for="ch in joinedChannels"
        :key="ch.id"
        :channel="ch"
        :active="activeChannel === ch"
        @activate="setActiveChannel(ch)"
      />
    </section>

    <channel-view v-if="activeChannel" :channel="activeChannel" :key="activeChannel.id" />

    <channel-list v-if="isChannelListOpen" @close="isChannelListOpen = false" />
    <character-browser v-if="isCharacterBrowserOpen" @close="isCharacterBrowserOpen = false" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import store from '@/store'
import { Channel, PrivateChat } from '@/store/chat/models'

import ChannelList from './channel-list/ChannelListOverlay.vue'
import ChannelTab from './channel/ChannelTab.vue'
import ChannelView from './channel/ChannelView.vue'
import CharacterBrowser from './character-browser/CharacterBrowser.vue'
import CharacterMenu from './character/CharacterMenu.vue'
import ChatAction from './ChatAction.vue'

export default Vue.extend({
  components: {
    ChannelList,
    ChannelTab,
    ChannelView,
    CharacterBrowser,
    CharacterMenu,
    ChatAction,
  },

  data() {
    return {
      isChannelListOpen: false,
      isCharacterBrowserOpen: false,

      activeChannel: null as Channel | null,
    }
  },

  computed: {
    joinedChannels(): Channel[] {
      return store.chat.channels.getJoinedChannels()
    },

    privateChats(): PrivateChat[] {
      return store.chat.privateChats.getOpenPrivateChats()
    },
  },

  created() {
    // this.createViews()
  },

  methods: {
    openChannelList() {
      this.isChannelListOpen = true
      store.chat.fetchChannelList()
    },

    openCharacterBrowser() {
      this.isCharacterBrowserOpen = true
    },

    setActiveChannel(ch: Channel) {
      this.activeChannel = ch
    },
  },
})
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

.grid {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: max-content 12rem auto;
  grid-gap: 4px;
  padding-left: 4px;
}
</style>
