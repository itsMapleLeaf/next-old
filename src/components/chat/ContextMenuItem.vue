<template>
  <a class="context-menu-item bg-color-main" href="#" @click.prevent>
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
.context-menu-item {
  display: block;
  padding: 0.3rem 0.6rem;
  opacity: 0.5;
  transition: 0.25s opacity;

  &:hover {
    opacity: 1;
  }
}
</style>
