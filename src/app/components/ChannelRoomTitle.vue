<template lang="pug">
span
  i(:class="'mdi mdi-' + icon")
  span(v-html='room.name')
</template>

<script>
export default {
  props: {
    room: Object
  },

  computed: {
    icon () {
      return this.room.name === this.room.id ? 'earth' : 'key-variant'
    }
  }
}
</script>
