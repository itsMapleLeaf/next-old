<template>
  <a href='#' @click.prevent="$emit('input', !value)"><small>
    <i :class="'mdi mdi-' + (value ? 'checkbox-marked' : 'checkbox-blank-outline')"></i>
    <slot></slot>
  </small></a>
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
