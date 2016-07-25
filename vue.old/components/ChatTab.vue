<template>
  <a href='#' class='flex-row' :class="activeClasses" @click.self="$emit('selected')">
    <span class='tab-content' :style="{ pointerEvents: 'none' }">
      <slot></slot>
    </span>
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
  align-items: center;
  cursor: default;
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
  padding: 0 0.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.close-button {
  opacity: 0.3;
  font-size: 0.7em;
  padding: 0 0.4em;
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
      return this.active ? 'active color-main' : 'inactive color-darker'
    }
  }
}
</script>
