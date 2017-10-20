<template>
  <a
    href='#'
    :class="['tab flex-grow flex-center', active ? 'bg-color-main' : 'faded']"
    @click="$emit('activate')"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },
}
</script>


<style scoped>
.tab {
  padding: 0.5rem;
}
</style>
