<template>
  <span>
    <i :class="'mdi mdi-' + icon"></i> {{room.name}}
  </span>
</template>

<script>
export default {
  props: {
    room: Object
  },

  computed: {
    icon () {
      return this.room.id === this.room.name ? 'earth' : 'key-variant'
    }
  }
}
</script>
