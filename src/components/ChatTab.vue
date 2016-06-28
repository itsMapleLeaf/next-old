<template>
  <a class='tab' :class="{ 'selected': selected }">
    <span><slot></slot></span>
  </a>
</template>

<script>
export default {
  props: {
    selected: Boolean
  }
}
</script>

<style lang="stylus" scoped></style>
