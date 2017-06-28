<template>
  <a href='#' class='tooltip-bottom' :data-tooltip='info' @click='action && action()'>
    <i :class="'mdi mdi-' + icon"></i>
  </a>
</template>

<script>
export default {
  props: {
    info: String,
    action: Function,
    icon: String,
  }
}
</script>
