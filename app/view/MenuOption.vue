<template lang='jade'>
a.ui-block.ui-padding-4.ui-hover-darken(href='#', @click.prevent='action')
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
