<template>
  <a href='#' class='flex-center-children' :class="activeClasses" @click.self="$emit('selected')">
    <span :style="{ pointerEvents: 'none' }"><slot></slot></span>
    <i class="mdi mdi-close" @click.prevent.stop="$emit('closed')"></i>
  </a>
</template>

<style scoped>
a {
  font-family: 'Roboto Condensed';
  width: 10em;
  justify-content: space-between;
}

a.ui-color-darker {
  opacity: 0.7;
}

a:not(:last-child) {
  margin-right: 0.2em;
}

span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0em 0.5em;
}

i {
  padding: 0em 0.5em;
  font-size: 0.7em;
  width: min-content;
  height: min-content;
  opacity: 0.3;
}
</style>

<script>
export default {
  props: {
    active: Boolean
  },

  computed: {
    activeClasses () {
      return this.active ? 'ui-color-main' : 'ui-color-darker'
    }
  }
}
</script>
