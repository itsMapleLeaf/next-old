<template>
  <div :class="['chat-tab flex-row', active && 'chat-tab--active bg-color-main']">
    <a href="#" class="chat-tab-title flex-grow flex-row flex-align-center" @click.prevent="$emit('activate')">
      <slot></slot>
      <span class="chat-tab-title-icon">
        <slot name="icon"></slot>
      </span>
      <span class="chat-tab-title-text">
        <slot name="title"></slot>
      </span>
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

.chat-tab-title-text {
  margin-left: 0.3rem;
}

.chat-tab-title-icon {
  img,
  i {
    display: block;
  }
}
</style>
