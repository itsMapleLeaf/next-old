<template>
  <div class="channel-list scroll-v bg-color-darken-1">
    <channel-list-item
      v-for="channel in channels"
      :key="channel.id"
      :channel="channel"
      :joined="joinedChannels.includes(channel.id)"
      @activate="$emit('activate-channel', channel.id)"
    />
  </div>
</template>

<script>
import ChannelListItem from './ChannelListItem.vue'

export default {
  components: {
    ChannelListItem,
  },

  props: {
    channels: Array,
    joinedChannels: Array,
  },
}
</script>

<style scoped>
.channel-list {
  height: 30rem;
  width: 24rem;
}
</style>
