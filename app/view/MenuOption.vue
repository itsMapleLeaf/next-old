<template>
  <a href='#' class='ui-block ui-padding-4 ui-hover-darken' @click.prevent='action'>
    <i :class="'mdi mdi-' + icon"></i> <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    action: Function,
    icon: String
  }
}
</script>
