<template>
  <a class='ui-text-small' href='#' @click.prevent="$emit('input', !value)">
    <i :class="'mdi mdi-' + (value ? 'checkbox-marked' : 'checkbox-blank-outline')"></i>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
