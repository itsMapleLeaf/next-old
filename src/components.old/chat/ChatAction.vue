<template>
  <a href='#' class="action-icon">
    <icon :size="32">{{ icon }}</icon>
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
  margin: 0.5rem;
  display: block;
  opacity: 0.5;

  &:hover {
    opacity: 0.75;
  }
}
</style>
