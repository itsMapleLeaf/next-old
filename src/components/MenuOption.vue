<template>
  <a class='hover-darken'>
    <i class='fa fa-{{icon}}'></i> <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>

<style lang="stylus" scoped></style>
