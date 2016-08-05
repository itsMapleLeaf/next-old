<template lang="jade">
.ui-border(@click='open = !open')
  .color-dark.ui-padding-3.ui-pointer
    | {{ currentLabel }} 
    span
      i.mdi.mdi-chevron-down(style='float: right')
  template(v-if='open')
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
