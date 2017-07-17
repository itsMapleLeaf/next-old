<template>
  <div class="overlay-shade">
    <div class="overlay-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.overlay-shade {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
}

.overlay-content {
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
