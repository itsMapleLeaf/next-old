<template>
  <overlay @shadeclick="$emit('close')">
    <div class="wrapper scroll-v bg-color-darken-1">
      <a href="#" v-for="{ id, title, userCount } in filteredChannels" :key="id" :class="['channel flex-row', joinedChannels[id] && 'channel--joined']" @pointerdown.prevent="toggleChannel(id)">
        <span class="channel-title flex-grow" v-html="title"></span>
        <span class="channel-user-count">{{ userCount }}</span>
      </a>
    </div>
    <div class="flex-row" style="padding: 0.5rem">
      <input class="flex-grow" style="margin-right: 0.5rem" placeholder="Search..." @input="updateSearchText($event.currentTarget.value)">
      <button @pointerdown="$emit('close')">Done</button>
    </div>
  </overlay>
</template>

<script>
import sortBy from 'lodash/sortBy'
import debounce from 'lodash/debounce'
import store from '@/store.new'

export default {
  data() {
    return {
      searchText: ''
    }
  },

  computed: {
    channels() {
      return store.chat.channelList
    },

    joinedChannels() {
      return store.chat.joinedChannels
    },

    sortedChannels() {
      return sortBy(this.channels, [
        ch => ch.type === 'public' ? 0 : 1,
        ch => ch.title.toLowerCase(),
      ])
    },

    filteredChannels() {
      const searchText = this.searchText.trim().toLowerCase()
      const channels = this.sortedChannels
      if (searchText === '') {
        return channels
      }
      return channels.filter(ch => ch.title.toLowerCase().includes(searchText))
    }
  },

  methods: {
    toggleChannel(id) {
      if (this.joinedChannels[id]) {
        store.chat.leaveChannel(id)
      } else {
        store.chat.joinChannel(id)
      }
    },

    updateSearchText: debounce(function(text) {
      this.searchText = text
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 30em;
  width: 24rem;
}

// .channel {}
.channel-title {
  padding: 0.4rem;
}

.channel-user-count {
  width: 3rem;
  padding: 0.4rem;
  text-align: right;
}

.channel--joined {
  background: rgba(46, 204, 113, 0.3);
}
</style>
