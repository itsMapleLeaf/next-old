<template>
  <a href='#'
    class='flex flex-align-center ui-padding-subtle ui-width-5 ui-divide-left'
    :class="active ? 'color-main' : 'color-dark ui-hover-darken'">
    <span class='ui-ellipsis'><slot></slot></span>
  </a>
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>
