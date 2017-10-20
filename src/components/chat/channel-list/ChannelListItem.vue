<template>
  <a
    href="#"
    :key="channel.id"
    :class="['channel flex-row', joined && 'channel--joined']"
    @click.prevent="$emit('activate')"
  >
    <span class="channel-title flex-grow" v-html="channel.title"></span>
    <span class="channel-user-count">{{ channel.userCount }}</span>
  </a>
</template>

<script>
import { ChannelInfo } from '@/store/models'

export default {
  props: {
    channel: ChannelInfo,
    joined: Boolean,
  },
}
</script>

<style>
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
