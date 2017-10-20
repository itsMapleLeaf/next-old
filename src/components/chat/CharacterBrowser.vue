<template>
  <overlay @shadeclick="$emit('close')">
    <div class="content flex-row scroll-v">
      <card class="card" v-for="char in friends" :key="char.name" v-bind="char"></card>
    </div>
  </overlay>
</template>

<script>
// import sortBy from 'lodash/sortBy'
import Card from './CharacterBrowserCard.vue'
import store from '@/store'

export default {
  components: {
    Card,
  },
  computed: {
    friends() {
      const { chat } = store
      const { friends, characters } = chat
      return Object.keys(friends)
        .sort()
        .map(friend => characters.getCharacter(friend))
        .filter(char => char.status === 'online')
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: min-content;
  height: 30rem;

  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;

  padding: 0.2rem;
}

.card {
  margin: 0.2rem;
}
</style>
