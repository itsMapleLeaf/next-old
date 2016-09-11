<template lang='pug'>
a.toggle(href='#', :class!="value && 'toggle-checked'", @click.prevent="$emit('input', !value)")
  i.mdi(:class="iconClass")
  span.icon-label
    slot
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
