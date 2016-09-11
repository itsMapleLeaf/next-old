<template lang='pug'>
a.toggle(href='#', :class!="value && 'toggle-checked'", @click="$emit('input', !value)")
  i.mdi(:class="iconClass")
  slot
</template>

<style lang='stylus'>
i { margin-right: 0.15em }
</style>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    iconClass () {
      return this.value
        ? 'mdi-checkbox-marked-circle-outline'
        : 'mdi-checkbox-blank-circle-outline'
    }
  }
}
</script>
