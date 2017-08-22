<template>
  <span>
    <span :class="'character-status-' + status.toLowerCase()">{{ status }}</span>
    <span v-if="statusMessage" v-html="' - ' + parseBBC(statusMessage)"></span>
  </span>
</template>

<script>
export default {
  props: {
    status: String,
    statusMessage: String,
  },
  components: {
    CharacterName: require('./CharacterName.vue'),
  }
}
</script>
