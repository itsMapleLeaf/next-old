<template lang='jade'>
a.ui-block.ui-padding-4.ui-hover-darken(href='#', @click.prevent='action')
  i(:class="'mdi mdi-' + icon")
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
