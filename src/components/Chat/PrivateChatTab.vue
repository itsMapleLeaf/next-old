<template>
  <chat-tab @activate="$emit('activate')" @close="$emit('close')" :active="active">
    <img slot="icon" :src="getAvatarURL(privateChat.partner)" style="width: 1rem; height: 1rem">
    <span slot="title" class="title" v-html="privateChat.partner"></span>
  </chat-tab>
</template>


<script>
import ChatTab from './ChatTab'
import { getAvatarURL } from '@/api'

export default {
  components: {
    ChatTab
  },
  props: {
    privateChat: Object,
    active: Boolean,
  },
  methods: {
    getAvatarURL
  }
}
</script>
