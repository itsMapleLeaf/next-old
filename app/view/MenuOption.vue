<template>
  <a href='#' class='ui-block ui-padding-4 ui-hover-darken' @click.prevent='action'>
    <i :class="'mdi mdi-' + icon"></i> {{ text }}
  </a>
</template>

<script>
export default {
  props: {
    text: String,
    action: Function,
    icon: String
  }
}
</script>
