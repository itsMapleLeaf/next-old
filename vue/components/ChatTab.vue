<template>
  <a href='#' class='flex-row flex-center-children' :class="activeClasses" @click.self="$emit('selected')">
    <div class='flex-center-children tab-content' :style="{ pointerEvents: 'none' }">
      <slot></slot>
    </div>
    <div class='ui-press close-button' @click.prevent.stop="$emit('closed')">
      <i class="mdi mdi-close"></i>
    </div>
  </a>
</template>

<style scoped>
a {
  font-family: 'Roboto Condensed';
  width: 10em;
  justify-content: space-between;
  cursor: default;
  padding-left: 0.5em;
  padding-right: 0.4em;
}

.inactive {
  opacity: 0.6;
}

.inactive:hover {
  opacity: 0.85;
}

a:not(:last-child) {
  margin-right: 0.2em;
}

.tab-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.close-button {
  opacity: 0.3;
  font-size: 0.7em;
}

.close-button:hover {
  opacity: 0.8;
}
</style>

<script>
export default {
  props: {
    active: Boolean
  },

  computed: {
    activeClasses () {
      return this.active ? 'active ui-color-main' : 'inactive ui-color-darker'
    }
  }
}
</script>
