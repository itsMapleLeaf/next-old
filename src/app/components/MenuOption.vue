<template lang="pug">
a.ui-block.ui-padding-4.ui-hover-darken(href='#', @click.prevent!="action && action()")
  i.mdi(:class="'mdi-' + icon")
  span
    slot
</template>

<script>
export default {
  props: {
    action: Function,
    icon: String
  }
}
</script>
