<template>
  <div class='ui-color-main ui-border ui-padding-regular ui-raised notice'>
    <i class='mdi mdi-information-outline'></i>
    <slot></slot>
  </div>
</template>

<style scoped>
.notice {
  width: 16em;
  cursor: default;
  user-select: none;
}
</style>

<script>
export default {}
</script>
