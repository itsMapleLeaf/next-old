<template>
  <chat-tab @activate="$emit('activate')" @close="$emit('close')" :active="active">
    <icon slot="icon">{{ channel.id === channel.title ? 'earth' : 'key-variant' }}</icon>
    <span slot="title" class="title" v-html="channel.title"></span>
  </chat-tab>
</template>


<script>
import ChatTab from '@/components/chat/ChatTab.vue'

export default {
  components: {
    ChatTab,
  },
  props: {
    channel: Object,
    active: Boolean,
  },
}
</script>
