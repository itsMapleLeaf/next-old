<template>
  <a href='#' class='ui-hover-darken ui-inline-block ui-faded ui-padding-subtle' :class="align">
    <i class='mdi mdi-arrow-left'></i>
  </a>
</template>

<style scoped>
a {
  position: absolute;
  left: 0;
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
