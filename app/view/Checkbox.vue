<template lang="jade">
a.ui-focus-darken.ui-padding-1(:class="{'ui-faded': !value}", href='#', @keydown.space="$emit('input', !value)", @keydown.enter.prevent='', @click="$emit('input', !value)")
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
