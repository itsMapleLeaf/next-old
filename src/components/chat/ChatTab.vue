<template>
  <div :class="['chat-tab flex-row', active && 'chat-tab--active bg-color-main']">
    <a href="#" class="chat-tab-title flex-grow" @click.prevent="$emit('activate')">
      <slot></slot>
    </a>
    <a href="#" class="chat-tab-close" @click.prevent="$emit('close')">
      <i class="mdi mdi-close"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>


<style lang="scss" scoped>
.chat-tab {
  opacity: 0.5;
}

.chat-tab-title {
  padding: 0.5rem;
  width: 10rem;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.chat-tab-close {
  padding: 0.5rem;
  opacity: 0.2;
  transition: 0.25s;

  &:hover {
    opacity: 0.5;
  }
}

.chat-tab--active {
  opacity: 1;
}
</style>
