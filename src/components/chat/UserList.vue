<template>
  <div>
    <div v-for="name in users" :key="name" style="margin: 0.4rem;">
      <character-name v-bind="characters[name]"></character-name>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  },
  components: {
    CharacterName: require('./CharacterName.vue'),
  },
  computed: {
    characters() {
      return this.$store.state.chat.characters
    },
  },
}
</script>
