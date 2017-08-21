<template>
  <span>
    <template v-if="type === 'channel'">
      <icon>{{ channel.id === channel.title ? 'earth' : 'key-variant' }}</icon>
      <span v-html="channel.title"></span>
    </template>
    <template v-if="type === 'privateChat'">
      <icon>account</icon>
      <span v-html="privateChat.partner"></span>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    type: String,
    channel: [Object, null],
    privateChat: [Object, null],
  }
}
</script>
