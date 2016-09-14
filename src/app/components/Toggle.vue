<template>
  <a class='toggle' href='#' :class="value && 'toggle-checked'" @click.prevent="$emit('input', !value)">
    <i class='mdi' :class='iconClass'></i>
    <span class='icon-label'>
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    iconClass () {
      return this.value
        ? 'mdi-checkbox-marked-outline'
        : 'mdi-checkbox-blank-outline'
    }
  }
}
</script>
