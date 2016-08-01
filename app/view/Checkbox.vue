<template lang='jade'>
a.ui-text-small.ui-transition.ui-hover-darken.ui-focus-darken.ui-border-focus.ui-padding-1(:class="{'ui-faded': !value}", href='#', @keydown.space="$emit('input', !value)", @keydown.enter.prevent='', @click="$emit('input', !value)")
  i(:class="'mdi mdi-' + (value ? 'checkbox-marked' : 'checkbox-blank-outline')")
  slot
</template>

<style scoped>
a {
  padding: 0.2em 0.4em;
}
</style>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
