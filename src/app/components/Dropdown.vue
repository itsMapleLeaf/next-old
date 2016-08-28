<template lang="pug">
.ui-border(@click='open = !open', style="position: relative")
  .color-dark.ui-padding-3.ui-pointer.ui-no-select
    | {{ currentLabel }}
    span
      i.mdi.mdi-chevron-down(style='float: right')
  transition(name='fade')
    div(v-if='open', style="position: absolute; width: 100%; z-index: 1")
      .color-darker.ui-padding-3.ui-pointer(v-for='item in items', @click="$emit('input', item.value)")
        | {{ item.label }}
</template>

<script>
export default {
  props: {
    items: Array,
    value: String
  },

  data () {
    return { open: false }
  },

  computed: {
    currentLabel () {
      const item = this.items.find(item => item.value === this.value)
      return item.label || item.value
    }
  }
}
</script>
