<template lang="pug">
menu-header(:character='name')
  span(slot='header') {{ header }}
  span.ui-faded(slot='subtext') In the mood for some play?
</template>

<script>
import MenuHeader from './MenuHeader.vue'

export default {
  components: {
    MenuHeader
  },
  props: {
    name: String
  },
  computed: {
    header () {
      return 'Hi, ' + this.name.split(' ')[0] + '!'
    }
  }
}
</script>
