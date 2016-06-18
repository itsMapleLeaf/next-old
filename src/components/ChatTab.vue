<template>
  <a
    class='row-2 col col-8 center-content-vertical tab'
    :class="{ 'selected': selected }">
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
