<template>
  <span>
    <template v-if="type === 'channel'">
      <i :class="'mdi mdi-' + (channel.id === channel.title ? 'earth' : 'key-variant')"></i>
      <span v-html="channel.title"></span>
    </template>
    <template v-if="type === 'privateChat'">
      <i class="mdi mdi-account"></i>
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
