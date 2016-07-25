<template>
  <a class='ui-text-small ui-transition ui-hover-darken ui-focus-darken ui-border-focus ui-padding-1'
    :class="{'ui-faded': !value}" href='#' @click.prevent="$emit('input', !value)">
    <i :class="'mdi mdi-' + (value ? 'checkbox-marked' : 'checkbox-blank-outline')"></i>
    <slot></slot>
  </a>
</template>

<style scoped>
a {
  padding: 0.2em 0.4em;
}
</style>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
