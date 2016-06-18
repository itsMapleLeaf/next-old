<template>
  <a>
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
