<template>
  <a href='#' class="action-icon">
    <i :class="'mdi mdi-' + icon"></i>
  </a>
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>


<style lang="scss" scoped>
.action-icon {
  font-size: 200%;
  margin: 0.5rem;
  display: block;
  opacity: 0.5;

  &:hover {
    opacity: 0.75;
  }
}
</style>
