<template>
  <div class="context-menu bg-color-darken-1" :style="{ left: x + 'px', top: y + 'px' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
