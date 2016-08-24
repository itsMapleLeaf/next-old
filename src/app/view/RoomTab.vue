<template lang="jade">
a.flex.flex-align-center.flex-justify-space-between.ui-width-5.ui-divide-left(href='#', :class="active ? 'color-main' : 'color-dark ui-faded'")
  span.ui-ellipsis.ui-padding-subtle
    slot
  span.ui-padding-subtle.ui-small.ui-faded(@click.stop="$emit('closed')")
    i.mdi.mdi-close
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>
