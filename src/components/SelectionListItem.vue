<template>
  <a class='selection-list-item' :class='{ "selected": selected }'>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    selected: Boolean
  }
}
</script>
