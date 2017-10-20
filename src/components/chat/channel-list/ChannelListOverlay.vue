<template>
  <overlay @shadeclick="$emit('close')">
    <div class="category-list bg-color-darken-1 flex-row">
      <channel-list-tab :active="currentCategory === 'public'" @activate="currentCategory = 'public'">
        <icon>earth</icon> Public
      </channel-list-tab>
      <channel-list-tab :active="currentCategory === 'private'" @activate="currentCategory = 'private'">
        <icon>key</icon> Private
      </channel-list-tab>
    </div>
    <channel-list
      v-show="currentCategory === 'public'"
      :channels="sortChannels(publicChannels)"
      :joinedChannels="joinedChannels"
      @activate-channel="toggleChannel"
    />
    <channel-list
      v-show="currentCategory === 'private'"
      :channels="sortChannels(privateChannels)"
      :joinedChannels="joinedChannels"
      @activate-channel="toggleChannel"
    />
    <div class="flex-row" style="padding: 0.5rem">
      <input
        class="flex-grow"
        style="margin-right: 0.5rem"
        placeholder="Search..."
        @input="updateSearchText($event.currentTarget.value)"
      >
      <button @pointerdown="$emit('close')">Done</button>
    </div>
  </overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import sortBy from 'lodash/sortBy'
import debounce from 'lodash/debounce'
import store from '@/store'
import { ChannelInfo } from '@/store/chat/models'
import ChannelListTab from './ChannelListTab.vue'
import ChannelList from './ChannelList.vue'

export default Vue.extend({
  components: {
    ChannelListTab,
    ChannelList,
  },

  data() {
    return {
      searchText: '',
      currentCategory: 'public',
    }
  },

  computed: {
    publicChannels(): ChannelInfo[] {
      return this.filterChannels(
        this.sortChannels(store.chat.channelList.getPublicChannels()),
      )
    },

    privateChannels(): ChannelInfo[] {
      return this.filterChannels(
        this.sortChannels(store.chat.channelList.getPrivateChannels()),
      )
    },

    joinedChannels(): string[] {
      return store.chat.channels.getJoinedChannels()
    },
  },

  methods: {
    toggleChannel(id: string) {
      if (this.joinedChannels.includes(id)) {
        store.chat.leaveChannel(id)
      } else {
        store.chat.joinChannel(id)
      }
    },

    updateSearchText: debounce(function(this: any, text: string) {
      this.searchText = text
    }, 500),

    // updateSearchText(text: string) {
    //   console.log(text)
    // },

    sortChannels(channels: ChannelInfo[]) {
      return sortBy(channels, ch => ch.title.toLowerCase())
    },

    filterChannels(channels: ChannelInfo[]) {
      const searchText = this.searchText.trim().toLowerCase()
      if (searchText === '') {
        return channels
      }
      return channels.filter(ch => ch.title.toLowerCase().includes(searchText))
    },
  },
})
</script>
