<template>
  <span class="flex-row flex-align-center">
    <template v-if="type === 'channel'">
      <span class="icon">
        <icon>{{ channel.id === channel.title ? 'earth' : 'key-variant' }}</icon>
      </span>
      <span class="title" v-html="channel.title"></span>
    </template>
    <template v-if="type === 'privateChat'">
      <span class="icon">
        <img :src="getAvatarURL(privateChat.partner)" class="private-chat-avatar">
      </span>
      <span class="title" v-html="privateChat.partner"></span>
    </template>
  </span>
</template>

<script>
import { getAvatarURL } from '../../api'

export default {
  props: {
    type: String,
    channel: [Object, null],
    privateChat: [Object, null],
  },
  methods: {
    getAvatarURL
  }
}
</script>

<style lang="scss" scoped>
.private-chat-avatar {
  width: 1em;
  height: 1em;
}

.title {
  margin-left: 0.3rem;
}

.icon {
  img,
  i {
    display: block;
  }
}
</style>
