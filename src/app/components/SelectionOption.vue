<template lang="pug">
a.ui-block.ui-padding-3.ui-transition(v-bind="props", @click="select")
  slot
</template>

<script>
export default {
  props: {
    option: String,
    value: [String, Array],
    active: Boolean
  },

  computed: {
    props () {
      return {
        href: '#',
        class: this.isSelected ? 'highlight-green' : ''
      }
    },

    isSelected () {
      return this.active ||
        (Array.isArray(this.value) && this.value.includes(this.option)) ||
        (this.option === this.value)
    }
  },

  methods: {
    select () {
      this.$emit('input', this.option)
    }
  }
}
</script>
