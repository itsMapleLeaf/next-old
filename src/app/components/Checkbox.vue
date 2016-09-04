<template lang="pug">
a.ui-focus-darken.ui-transition(href='#', :class="{ 'ui-faded': !value }",
  @keydown.space="$emit('input', !value)", @keydown.enter.prevent='',
  @click="$emit('input', !value)")
  small
    i.mdi(:class="'mdi-' + (value ? 'checkbox-marked' : 'checkbox-blank-outline')")
    span
      slot
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
