<template>
  <span>
    <i class='mdi mdi-earth'></i> {{room.name}}
  </span>
</template>

<script>
export default {
  props: {
    room: Object
  }
}
</script>
