<template lang="pug">
a.ui-block.ui-padding-4.ui-hover-darken(href='#', @click.prevent!="$emit('input')")
  i.mdi(:class="'mdi-' + icon")
  span
    slot
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>
