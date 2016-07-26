<template>
  <a href='#' class='ui-hover-darken ui-transition ui-inline-block ui-faded' :class="align">
    <i class='mdi mdi-arrow-left'></i>
  </a>
</template>

<style scoped>
a {
  position: absolute;
  left: 0;
  padding: 0.5em;
}

.top { top: 0 }
.bottom { bottom: 0 }
.middle { top: 50%; transform: translateY(-50%) }
</style>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'bottom'
    }
  }
}
</script>
