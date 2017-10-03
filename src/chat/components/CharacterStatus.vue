<template>
  <span>
    <span :class="'character-status-' + status.toLowerCase()">{{ status }}</span>
    <span v-if="statusMessage" v-html="' - ' + parseBBC(statusMessage)"></span>
  </span>
</template>

<script>
import { parseBBC } from '@/chat/bbc'

export default {
  props: {
    status: String,
    statusMessage: String,
  },
  components: {
    CharacterName: require('./CharacterName.vue'),
  },
  methods: {
    parseBBC
  }
}
</script>
